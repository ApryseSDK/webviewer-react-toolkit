const fs = require('fs');
const scss = require('postcss-scss');

/* --- Helpers. --- */

function getAST(path) {
  const contents = fs.readFileSync(path);
  return scss.parse(contents.toString());
}

function propMap(cssVariables) {
  return declaration => {
    const { p, v } = { p: declaration.prop, v: declaration.value };
    const scss = p;
    const css = v;
    const value = cssVariables.find(c => c.prop === v).value;
    return { scss, css, value };
  };
}

function printFile(path, ast) {
  fs.writeFileSync(path, `export default ${JSON.stringify(ast, null, 2)}`);
}

/**
 * Parse the mixins file and generate mixins mdx.
 */
async function mixins() {
  const url = 'src/styles/_mixins.scss';
  const docsUrl = 'src/__stories__/2_style/3_mixins.stories.mdx';
  const mixinsUrl = 'src/__stories__/2_style/mixins.ts';

  const mixinsAst = getAST(url);
  const docsFile = fs.readFileSync(docsUrl);

  const mixinLines = docsFile.toString().split('\n');
  const indexOfEntry = mixinLines.findIndex(l => l.includes('GENERATE_ENTRY'));
  const pre = mixinLines.slice(0, indexOfEntry + 1).join('\n');

  const mixinNodes = mixinsAst.nodes;

  const mixins = mixinNodes.filter(n => n.name === 'mixin');
  const css = mixins[0].source.input.css.split('\n');

  const data = mixins.map(m => {
    const nodes = m.nodes;
    const animationNodes = nodes.filter(n => n.prop === 'animation');
    const isMedia = nodes.some(n => n.name === 'media');
    const animation = animationNodes
      .map(n => {
        const animationName = n.value.split(' ')[0];
        const animationNode = mixinNodes.find(n => n.params === animationName);
        if (!animationNode) return undefined;
        return css
          .slice(
            animationNode.source.start.line - 1,
            animationNode.source.end.line,
          )
          .join('\n');
      })
      .filter(Boolean)
      .join('\n\n');
    const media = isMedia ? ` {\n  // Content\n}` : '';
    return {
      include: `@include ${m.params}${media};`,
      code: css
        .slice(m.source.start.line - 2, m.source.end.line)
        .join('\n')
        .trim(),
      animation: animation && `\n\n${animation}`,
    };
  });

  printFile(
    mixinsUrl,
    data.map(d => d.include),
  );

  fs.writeFileSync(
    docsUrl,
    `${pre}
${data
  .map(
    (d, i) => `
<Mixins index={${i}} />

\`\`\`scss
${d.code}${d.animation}
\`\`\`
`,
  )
  .join('\n')}`,
  );
}

/**
 * Parse variables and themes files, generate variables and colors mdx.
 */
function main() {
  /* --- Generate mixins file. --- */

  mixins();

  const ast = getAST('src/styles/_variables.scss');
  const themeAst = getAST('src/styles/_theme.scss');

  const nodes = ast.nodes;
  const themeNodes = themeAst.nodes;

  const cssVariables = themeNodes
    .find(n => n.selector === ':root')
    .nodes.map(d => ({ prop: `var(${d.prop})`, value: d.value }));

  const mapper = propMap(cssVariables);

  const declarations = (() => {
    const color = [];
    const zIndex = [];
    const padding = [];
    const breakpoint = [];
    const fontSize = [];
    const fontWeight = [];
    const borderRadius = [];
    const other = [];

    nodes.forEach(n => {
      if (n.type !== 'decl') return;
      if (n.prop.startsWith('$color')) return color.push(n);
      if (n.prop.startsWith('$z-index')) return zIndex.push(n);
      if (n.prop.startsWith('$padding')) return padding.push(n);
      if (n.prop.endsWith('boundary')) return breakpoint.push(n);
      if (n.prop.startsWith('$font-size')) return fontSize.push(n);
      if (n.prop.startsWith('$font-weight')) return fontWeight.push(n);
      if (n.prop.startsWith('$border-radius')) return borderRadius.push(n);
      other.push(n);
    });

    return {
      color,
      zIndex,
      padding,
      breakpoint,
      fontSize,
      fontWeight,
      borderRadius,
      other,
    };
  })();

  /* --- Generate theme variables and colors. --- */

  const allColors = declarations.color.map(mapper);

  const colors = (() => {
    const theme = [];
    const font = [];
    const gray = [];
    const blueGray = [];
    const white = [];
    const other = [];

    allColors.forEach(c => {
      if (c.scss.startsWith('$color-theme')) return theme.push(c);
      if (c.scss.startsWith('$color-font')) return font.push(c);
      if (c.scss.startsWith('$color-gray')) return gray.push(c);
      if (c.scss.startsWith('$color-blue-gray')) return blueGray.push(c);
      if (c.scss.startsWith('$color-white')) return white.push(c);
      other.push(c);
    });

    return { theme, font, gray, blueGray, white, other };
  })();

  /* --- Generate others. --- */

  const fontSize = declarations.fontSize.map(mapper);
  const fontWeight = declarations.fontWeight.map(mapper);
  const padding = declarations.padding.map(mapper);
  const borderRadius = declarations.borderRadius.map(mapper);
  const breakpoint = declarations.breakpoint.map(mapper);
  const zIndex = declarations.zIndex.map(mapper);
  const other = declarations.other.map(mapper);

  printFile('src/__stories__/2_style/styleVariables.ts', {
    colors,
    fontSize,
    fontWeight,
    padding,
    borderRadius,
    breakpoint,
    zIndex,
    other,
  });
}

main();
