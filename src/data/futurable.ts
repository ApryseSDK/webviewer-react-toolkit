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
export function futureableOrLazyToFuturable<T>(futurableOrLazy: FuturableOrLazy<T>): Futurable<T> {
  return futurableOrLazy instanceof Function ? futurableOrLazy() : futurableOrLazy;
}

/**
 * Returns the promise of a futurable or lazy futurable. This should only be
 * used if you want to ensure the returned result is a promise, unlike
 * `futureableOrLazyToFuturable` which might just return `T`.
 * @param futurableOrLazy A `Futurable` or a `LazyFuturable`.
 */
export async function futureableOrLazyToPromise<T>(futurableOrLazy: FuturableOrLazy<T>): Promise<T> {
  return futureableOrLazyToFuturable(futurableOrLazy);
}

/**
 * Returns a function to get a futurable.
 * @param futurableOrLazy A `Futurable` or a `LazyFuturable`.
 */
export function futureableOrLazyToLazyFuturable<T>(futurableOrLazy: FuturableOrLazy<T>): LazyFuturable<T> {
  return futurableOrLazy instanceof Function ? futurableOrLazy : () => futurableOrLazy;
}
