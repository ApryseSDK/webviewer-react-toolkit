/**
 * Joins segments with '/' to create a path.
 * @param segments The multiple segments to join.
 */
export function pathify(...segments: string[]) {
  return segments.join('/');
}

export const getPaths = (componentName: string) => {
  // Directories.
  const rootDir = 'src';
  const componentCommonDir = pathify(rootDir, 'components'); // Components folder.
  const componentDir = pathify(componentCommonDir, componentName);

  // Files.
  const indexFile = 'index.ts';
  const componentFile = componentName + '.tsx';
  const styleFile = '_' + componentName + '.scss';
  const testFile = componentName + '.test.tsx';
  const storyFile = componentName + '.stories.tsx';
  const readmeFile = 'README.md';
  const styleIndexFile = 'index.scss';
  const componentIndexFile = 'index.ts';

  return {
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
  };
};
