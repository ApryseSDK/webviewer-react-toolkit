import { useCallback, useEffect, useRef } from 'react';
import { ArgumentTypes } from '../utils/typeUtils';

const DEFAULT_THROTTLE_TIMEOUT = 500;

/**
 *
 * @param lazyFuturable
 * @param throttleTimeout
 */
function useThrottle<T extends Function>(lazyFuturable: T, throttleTimeout?: number) {
  const timeout = useRef<number>();

  const lazyFuturableRef = useRef(lazyFuturable);
  const throttleTimeoutRef = useRef(throttleTimeout);
  useEffect(() => {
    lazyFuturableRef.current = lazyFuturable;
    throttleTimeoutRef.current = throttleTimeout;
  });

  const throttledFuturable = useCallback((...args: ArgumentTypes<T>) => {
    clearTimeout(timeout.current);
    timeout.current = window.setTimeout(
      () => lazyFuturableRef.current(...args),
      throttleTimeoutRef.current ?? DEFAULT_THROTTLE_TIMEOUT,
    );
  }, []);

  useEffect(() => {
    return () => clearTimeout(timeout.current);
  }, []);

  return throttledFuturable;
}

export default useThrottle;
