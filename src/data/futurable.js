'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.memoizedPromiseToFuturableOrLazy = exports.futureableOrLazyToFuturable = void 0;
/**
 * Returns a futurable from a futurable or a lazy futurable. If lazy, will call
 * to convert to futurable. Use this at evaluation time only, as any lazy
 * futurables will be called at this point.
 * @param futurableOrLazy A `Futurable` or a `LazyFuturable`.
 */
function futureableOrLazyToFuturable(futurableOrLazy) {
  return futurableOrLazy instanceof Function
    ? futurableOrLazy()
    : futurableOrLazy;
}
exports.futureableOrLazyToFuturable = futureableOrLazyToFuturable;
/**
 * If the MemoizedPromise is done, will turn into Promise, otherwise will turn
 * into lazy Promise
 * @param memoizedPromise The memoized promise to convert.
 */
function memoizedPromiseToFuturableOrLazy(memoizedPromise) {
  if (memoizedPromise.done) return memoizedPromise.get();
  return memoizedPromise.get;
}
exports.memoizedPromiseToFuturableOrLazy = memoizedPromiseToFuturableOrLazy;
//# sourceMappingURL=futurable.js.map
