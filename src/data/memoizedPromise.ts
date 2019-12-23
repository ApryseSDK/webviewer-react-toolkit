import { Futurable, FuturableOrLazy, futureableOrLazyToFuturable } from './futurable';

export type MemoizeOptions = {
  preprocess?: boolean;
};

/**
 * This class is responsible for wrapping tasks in a promise that won't be
 * executed until the result is actually required. Calling .get() on the class
 * will start the task, and resolve with the result. If the task has already
 * been executed once, it will resolve immediatly with the last result.
 */
export default class MemoizedPromise<T> {
  private _futurableOrLazy: FuturableOrLazy<T>;
  private _result?: Futurable<T>;
  private _done: boolean;

  constructor(futurableOrLazy: FuturableOrLazy<T>, options: MemoizeOptions = {}) {
    this._futurableOrLazy = futurableOrLazy;
    this._result = undefined;
    this._done = false;

    // If the option to preprocess is specified, or the provided input is not
    // a lazy function, then immediately set the result and set done to true.
    if (options.preprocess || typeof futurableOrLazy !== 'function') {
      this._result = futureableOrLazyToFuturable(this._futurableOrLazy);
      this._done = true;
    }
  }

  /**
   * Is true if the value is no longer a lazy function so that calling `get`
   * will immediately return your promise.
   */
  get done() {
    return this._done;
  }

  /**
   * Resolves with the result of the task given in the constructor
   * If its already been resolved, it just resolves immediatly with the
   * calculated value.
   */
  async get() {
    if (this._result !== undefined) return this._result;
    this._result = futureableOrLazyToFuturable(this._futurableOrLazy);
    const tempValue = await this._result;
    this._done = true;
    return tempValue;
  }
}
