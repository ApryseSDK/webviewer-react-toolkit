/**
 * Either a promise to return a type `T`, or `T` itself.
 */
export type Futurable<T> = Promise<T> | T;

/**
 * Function that returns a `Futurable`.
 */
export type FuturableGetter<T> = () => Futurable<T>;

/**
 * A `FuturableGetter`, or a `Futurable`.
 */
export type FuturableOrGetter<T> = Futurable<T> | FuturableGetter<T>;

/**
 * Returns a futurable.
 * @param futurableOrGetter A `Futurable` or a `FuturableGetter`.
 */
export function futureableOrGetterToFuturable<T>(futurableOrGetter: FuturableOrGetter<T>): Futurable<T> {
  return futurableOrGetter instanceof Function ? futurableOrGetter() : futurableOrGetter;
}

/**
 * Returns a function to get a futurable.
 * @param futurableOrGetter A `Futurable` or a `FuturableGetter`.
 */
export function futureableOrGetterToFuturableGetter<T>(futurableOrGetter: FuturableOrGetter<T>): FuturableGetter<T> {
  return futurableOrGetter instanceof Function ? futurableOrGetter : () => futurableOrGetter;
}
