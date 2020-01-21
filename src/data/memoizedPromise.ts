import { Futurable, FuturableOrLazy, futureableOrLazyToFuturable, memoizedPromiseToFuturableOrLazy } from './futurable';

export type MemoizeOptions = {
  preprocess?: boolean;
};

/**
 * This class is responsible for wrapping tasks in a promise that won't be
 * executed until the result is actually required. Calling .get() on the class
 * will start the task, and resolve with the result. If the task has already
 * been executed once, it will resolve immediatly with the last result.
 */
export class MemoizedPromise<T> {
  private _futurableOrLazy: FuturableOrLazy<T>;
  private _result?: Futurable<T>;
  private _done: boolean;

  constructor(futurableOrLazy: MemoizedPromise<T> | FuturableOrLazy<T>, options: MemoizeOptions = {}) {
    if (futurableOrLazy instanceof MemoizedPromise) {
      this._futurableOrLazy = memoizedPromiseToFuturableOrLazy(futurableOrLazy);
    } else {
      this._futurableOrLazy = futurableOrLazy;
    }

    this._result = undefined;
    this._done = false;

    if (options.preprocess || typeof this._futurableOrLazy !== 'function') {
      this._result = futureableOrLazyToFuturable(this._futurableOrLazy);
      this._done = true;
    }
  }

  /** Is true if the value is memoized. */
  get done() {
    return this._done;
  }

  /** Resolves with a promise for the value. */
  get = async () => {
    if (this._done) return this._result as Futurable<T>;
    this._result = futureableOrLazyToFuturable(this._futurableOrLazy);
    this._done = true;
    return this._result;
  };
}
