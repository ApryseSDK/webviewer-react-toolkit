/**
 * Either a promise to return a type `T`, or `T` itself.
 */
export type Futurable<T> = Promise<T> | T;

/**
 * Function that returns a `Futurable`.
 */
export type LazyFuturable<T> = () => Futurable<T>;

/**
 * A `LazyFuturable`, or a `Futurable`.
 */
export type FuturableOrLazy<T> = Futurable<T> | LazyFuturable<T>;

/**
 * Returns a futurable.
 * @param futurableOrLazy A `Futurable` or a `LazyFuturable`.
 */
export function futureableOrGetterToFuturable<T>(futurableOrLazy: FuturableOrLazy<T>): Futurable<T> {
  return futurableOrLazy instanceof Function ? futurableOrLazy() : futurableOrLazy;
}

/**
 * Returns a function to get a futurable.
 * @param futurableOrLazy A `Futurable` or a `LazyFuturable`.
 */
export function futureableOrGetterToLazyFuturable<T>(futurableOrLazy: FuturableOrLazy<T>): LazyFuturable<T> {
  return futurableOrLazy instanceof Function ? futurableOrLazy : () => futurableOrLazy;
}
