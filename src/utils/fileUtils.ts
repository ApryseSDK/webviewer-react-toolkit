/**
 * Returns the extension of a filename.
 */
export const getExtension = (filename = '') => {
  const split = filename.split('.');
  return split.pop() as string;
};
