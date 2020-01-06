/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Remove the specified Keys of T. Like Omit, but with autocompletion.
 *
 * @example
 * type SomeProps = {field1: string; field2: string};
 * const x: Remove<SomeProps, 'field2'> = {field1: 'Hello, World!'};
 */
export type Remove<T, Keys extends keyof T> = Pick<T, Exclude<keyof T, Keys>>;

/**
 * Include only the specified Keys of T.
 *
 * @example
 * type SomeProps = {field1: string; field2: string};
 * const x: Include<SomeProps, 'field2'> = {field2: 'Hello, World!'};
 */
export type Include<T, Keys extends keyof T> = Pick<T, Extract<keyof T, Keys>>;

/**
 * Extract the common item type in array of similar items T.
 *
 * @example
 * const x = [{a: 'a', b: 'b'}, {a: 'aa', b: 'bb'}];
 * const y: ItemOf<typeof x> = {a: 'Hello'; b: 'World'};
 */
export type ItemOf<T extends any[]> = T[number];

/**
 * Extracts an array of argument types of T.
 *
 * @example
 * const x = (a: string, b: number) => a + b;
 * const x: ArgumentTypes<typeof x> = ['Hello, World!', 100];
 */
export type ArgumentTypes<T extends Function> = T extends (...args: infer A) => any ? A : never;

/**
 * Requires at least one of the specified Keys of T. If no keys provided, will
 * require at least one of any keyof T.
 *
 * @example
 * type SomeProps = {field1?: string; field2?: string};
 * const x: RequireAtLeastOne<SomeProps, 'hello' | 'world'> = {field1: 'Hello, World!'};
 */
export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Remove<T, Keys> &
  { [K in Keys]-?: Required<Pick<T, K>> & Partial<Remove<T, Keys>> }[Keys];
