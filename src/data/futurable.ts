import { MemoizedPromise } from './memoizedPromise';

/** Either a promise to return a type `T`, or `T` itself. */
export type Futurable<T> = Promise<T> | T;

/** Function that returns a promise of `T`, or `T` itself. */
export type LazyFuturable<T> = () => Futurable<T>;

/** A promise of `T`, or `T` itself, or a function to return either. */
export type FuturableOrLazy<T> = Futurable<T> | LazyFuturable<T>;

/**
 * Returns a futurable from a futurable or a lazy futurable. If lazy, will call
 * to convert to futurable. Use this at evaluation time only, as any lazy
 * futurables will be called at this point.
 * @param futurableOrLazy A `Futurable` or a `LazyFuturable`.
 */
export function futureableOrLazyToFuturable<T>(futurableOrLazy: FuturableOrLazy<T>): Futurable<T> {
  return futurableOrLazy instanceof Function ? futurableOrLazy() : futurableOrLazy;
}

/**
 * If the MemoizedPromise is done, will turn into Promise, otherwise will turn
 * into lazy Promise
 * @param memoizedPromise The memoized promise to convert.
 */
export function memoizedPromiseToFuturableOrLazy<T>(memoizedPromise: MemoizedPromise<T>): FuturableOrLazy<T> {
  if (memoizedPromise.done) return memoizedPromise.get();
  return memoizedPromise.get;
}
