/* eslint-disable no-console */

import c from 'ansi-colors';

/* --- Constants --- */

const MAX_KEY_LENGTH = 9; // Equal to longest build key given to loggers.
export const SUCCESS_SYMBOL = '✔';
export const ERROR_SYMBOL = '✘';
export const WARNING_SYMBOL = '!';

/* --- Helpers --- */

/**
 * Pads a key with spaces until it's equal to max key length. If greater than
 * max key length, will trim end and add ellipses.
 * @param key The key to pad to max length.
 */
const padEndToMaxLength = (key: string) => {
  if (key.length > MAX_KEY_LENGTH) {
    return key.slice(0, MAX_KEY_LENGTH - 3) + '...';
  }
  return key.padEnd(MAX_KEY_LENGTH);
};

/** Formats the current time hh:mm:ss. */
const getCurrentTime = () => {
  const makeTwoDigits = (i: number) => {
    let formattedNumber = String(i);
    if (i < 10) formattedNumber = '0' + formattedNumber;
    return formattedNumber;
  };
  const now = new Date();
  const h = makeTwoDigits(now.getHours());
  const m = makeTwoDigits(now.getMinutes());
  const s = makeTwoDigits(now.getSeconds());
  return h + ':' + m + ':' + s;
};

/* --- Loggers --- */

/** Clear the terminal. */
export const clearTerminal = () => process.stdout.write('\u001b[2J\u001b[0;0H');

/** Basic console log. */
export const log = console.log;

/** Basic console warn. */
export const warn = console.warn;

/** Basic console error. */
export const err = console.error;

/** An error in all red. */
export const redErr = (message: string) => console.error(c.red(message));

/** Display a time and key. For build tasks successes. */
export const timeLog = (key: string, message: string) =>
  console.log(
    `${c.dim(`[${getCurrentTime()}]`)} ${c.green(`${SUCCESS_SYMBOL}`)} [${c.green(padEndToMaxLength(key))}] ${message}`,
  );

/** Display a time and key. For build tasks warnings. */
export const timeWrn = (key: string, message: string) =>
  console.error(
    `${c.dim(`[${getCurrentTime()}]`)} ${c.yellow(`${WARNING_SYMBOL}`)} [${c.yellow(
      padEndToMaxLength(key),
    )}] ${message}`,
  );

/** Display a time and key. For build tasks errors. */
export const timeErr = (key: string, message: string) =>
  console.error(
    `${c.dim(`[${getCurrentTime()}]`)} ${c.red(`${ERROR_SYMBOL}`)} [${c.red(padEndToMaxLength(key))}] ${message}`,
  );
