/**
 * Transforms pascal case (eg. SomeString) to camel case (eg. someString).
 * @param s The pascal case string to transform to camel case.
 */
export function pascalToCamel(s: string) {
  return s.charAt(0).toLowerCase() + s.slice(1);
}

/**
 * Transforms pascal case (eg. SomeString) to delimiter (eg. some-string).
 * @param string The pascal case string.
 * @param delimiter Defaults to '-'.
 */
export function pascalToDelimiter(string: string, delimiter = '-') {
  return string
    .split(/(?=[A-Z])/)
    .join(delimiter)
    .toLowerCase();
}
