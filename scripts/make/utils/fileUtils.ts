import fs from 'fs';

/* --- Constants --- */

const IMPORT_START_MARKER = '<import-start>';
const IMPORT_END_MARKER = '<import-end>';

/* --- Helpers --- */

/**
 * Splits a file's string data into lines, and returns three arrays:
 * 1. Before and including the `IMPORT_START_MARKER`
 * 2. Between the two import markers
 * 3. Including and after the `IMPORT_END_MARKER`
 * @param data Data read from a file.
 */
function splitFileAtMarkers(data: string) {
  const lines = data.split('\n');
  const startIndex = lines.findIndex(line => line.includes(IMPORT_START_MARKER));
  const endIndex = lines.findIndex(line => line.includes(IMPORT_END_MARKER));

  const preArray = lines.slice(0, startIndex + 1);
  const importsArray = lines.slice(startIndex + 1, endIndex);
  const postArray = lines.slice(endIndex);

  return [preArray, importsArray, postArray];
}

/**
 * Adds an import to the imports section of a file, sorts the imports, then
 * returns a single joined string to write to the file.
 * @param data Data read from a file.
 * @param importToAdd Import line to add to the file.
 */
function addSortedImport(data: string, importToAdd: string) {
  const [pre, imports, post] = splitFileAtMarkers(data);
  // Only add if it doesn't already exist.
  if (imports.includes(importToAdd)) throw new Error('Import already exists.');
  imports.push(importToAdd);
  imports.sort();
  return pre.concat(imports, post).join('\n');
}

/* --- File transformers --- */

/**
 * Adds the `importToAdd` in order to the imports of the path at `filePath`.
 * @param filePath Path to the file.
 * @param importToAdd Import line to add to the file.
 * @param callback Callback for when task is completed.
 */
export function updateImportFile(
  filePath: string,
  importToAdd: string,
  callback: (error: NodeJS.ErrnoException | null) => void,
) {
  fs.readFile(filePath, 'utf8', (readError, data) => {
    if (readError) {
      callback(readError);
      return;
    }
    try {
      const newFileContent = addSortedImport(data, importToAdd);
      fs.writeFile(filePath, newFileContent, writeError => {
        if (writeError) {
          callback(writeError);
          return;
        }
        callback(null);
      });
    } catch (addImportError) {
      callback(addImportError);
    }
  });
}
