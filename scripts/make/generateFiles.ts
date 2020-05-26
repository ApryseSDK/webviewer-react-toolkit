import c from 'ansi-colors';
import fs from 'fs';
import { component } from './file-content/component';
import { componentIndex } from './file-content/componentIndex';
import { componentReadme } from './file-content/componentReadme';
import { componentRef } from './file-content/componentRef';
import { componentStory } from './file-content/componentStory';
import { componentStyle } from './file-content/componentStyle';
import { componentTest } from './file-content/componentTest';
import { MakeOptions } from './types';
import { updateImportFile } from './utils/fileUtils';
import { err, timeErr, timeLog } from './utils/logUtils';
import { getPaths, pathify } from './utils/pathUtils';

/**
 * Generate the files.
 */
export const generateFiles = ({ isRef, componentName }: MakeOptions) => {
  // Directories and files.
  const {
    rootDir,
    componentCommonDir,
    componentDir,
    indexFile,
    componentFile,
    styleFile,
    testFile,
    storyFile,
    readmeFile,
    styleIndexFile,
    componentIndexFile,
  } = getPaths(componentName);

  /* --- Check for errors --- */

  const errors = [];

  // Custom component folder already exists.
  if (fs.existsSync(componentDir)) {
    errors.push('Directory `' + componentDir + '` already exists');
  }

  // List all errors, return early if not forced.
  if (errors.length) {
    errors.forEach((error) => err(`${c.red('Error:')} ${error}\n`));
    return;
  }

  /* --- File generation --- */

  // Make component folder, bail out if any errors.
  try {
    fs.mkdirSync(componentDir);
    timeLog('directory', `Created \`${componentDir}\``);
  } catch (error) {
    timeErr('directory', `Could not create \`${componentDir}\``);
    return;
  }

  // Make component index file.
  const componentIndexPath = pathify(componentDir, indexFile);
  fs.writeFile(componentIndexPath, componentIndex(componentName), { flag: 'wx' }, (error) => {
    if (error) timeErr('index', `Could not create \`${componentIndexPath}\``);
    else timeLog('index', `Created \`${componentIndexPath}\``);
  });

  // Make component.
  const componentContent = isRef ? componentRef(componentName) : component(componentName);
  const componentPath = pathify(componentDir, componentFile);
  fs.writeFile(componentPath, componentContent, { flag: 'wx' }, (error) => {
    if (error) timeErr('component', `Could not create \`${componentPath}\``);
    else timeLog('component', `Created \`${componentPath}\``);
  });

  // Make component stylesheet.
  const stylesheetPath = pathify(componentDir, styleFile);
  fs.writeFile(stylesheetPath, componentStyle(componentName), { flag: 'wx' }, (error) => {
    if (error) timeErr('style', `Could not create \`${stylesheetPath}\``);
    else timeLog('style', `Created \`${stylesheetPath}\``);
  });

  // Make component test file.
  const testPath = pathify(componentDir, testFile);
  fs.writeFile(testPath, componentTest(componentName), { flag: 'wx' }, (error) => {
    if (error) timeErr('test', `Could not create \`${testPath}\``);
    else timeLog('test', `Created \`${testPath}\``);
  });

  // Make component story file.
  const storyPath = pathify(componentDir, storyFile);
  fs.writeFile(storyPath, componentStory(componentName), { flag: 'wx' }, (error) => {
    if (error) timeErr('story', `Could not create \`${storyPath}\``);
    else timeLog('story', `Created \`${storyPath}\``);
  });

  // Make component README.
  const storyContent = componentReadme(componentName);
  const readmePath = pathify(componentDir, readmeFile);
  fs.writeFile(readmePath, storyContent, { flag: 'wx' }, (error) => {
    if (error) timeErr('docs', `Could not create \`${readmePath}\``);
    else timeLog('docs', `Created \`${readmePath}\``);
  });

  /* --- File modification ---*/

  // Add the new stylesheet import into the root stylesheet.
  updateImportFile(
    pathify(rootDir, styleIndexFile),
    `@import './components/${pathify(componentName, componentName)}';`,
    (error) => {
      if (error) timeErr('index', 'Could not add import to Sass index file');
      else timeLog('index', 'Added import to Sass index file');
    },
  );

  // Add the new component import into the root index file.
  updateImportFile(pathify(componentCommonDir, componentIndexFile), `export * from './${componentName}';`, (error) => {
    if (error) timeErr('index', 'Could not add import to TypeScript index file');
    else timeLog('index', 'Added import to TypeScript index file');
  });
};
