export const componentIndex = (componentName: string) =>
  `export {${componentName} as default, ${componentName}Props} from './${componentName}';
`;
