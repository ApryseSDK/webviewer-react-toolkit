const POSSIBLE_LETTERS = 'bcdghjklmnpqrstvwxyz'; // No vowels: attempting to avoid "bad words".
const POSSIBLE_NUMBERS = '0123456789';
const ONLY_UPPERCASE = POSSIBLE_LETTERS.toUpperCase() + POSSIBLE_NUMBERS;
const UPPER_AND_LOWERCASE = ONLY_UPPERCASE + POSSIBLE_LETTERS;

/**
 * Generates a random string to use as a unique identifier. This should be used
 * over `getId` if you need to use it as a DOM id, or a React key.
 *
 * @param prefix Optional. Prefix for the string id.
 * @param length Default: 15. Length of string.
 * @param onlyUpperCase Default: false. No lowercase letters.
 */
export function getStringId(prefix?: string, length = 15, onlyUpperCase = false): string {
  const possibleChars = onlyUpperCase ? ONLY_UPPERCASE : UPPER_AND_LOWERCASE;
  let text = '';
  for (let i = 0; i < length; i++) {
    text += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
  }
  if (prefix) return `${prefix}_${text}`;
  return text;
}

export type UniqueIdentifier = symbol | string;

/**
 * Returns a Symbol to uniquely identify something. Will fallback to using
 * string.
 *
 * @param description Description of the Symbol. Used as string prefix if not supported.
 */
export function getId(description?: string | number): UniqueIdentifier {
  if (typeof Symbol === 'function') return Symbol(description);
  return `${description}_${getStringId()}`;
}
