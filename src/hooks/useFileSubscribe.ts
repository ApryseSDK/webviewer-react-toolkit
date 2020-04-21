import { useEffect, useState, useMemo } from 'react';
import { FileEventType, FileLike, MemoizedPromise } from '../data';
import { DEFAULT_THROTTLE_TIMEOUT } from '../utils';

export interface UseFileSubscribeOptions {
  /** The timeout to throttle initial fetch of value. Default: 500ms. */
  throttle?: number;
}

/**
 * Will subscribe to a value from a file and return the value, as well as any
 * async errors.
 * @param file The file to subscribe to.
 * @param getCurrentValue Function to extract the current value from the file.
 * @param eventType The event type to subscribe. Won't subscribe if not given.
 */
export function useFileSubscribe<F extends FileLike, T>(
  file: F,
  getCurrentValue: (file: F) => T | MemoizedPromise<T>,
  eventType?: FileEventType,
  options: UseFileSubscribeOptions = {},
) {
  const [error, setError] = useState<any>();
  const [value, setValue] = useState<T | undefined>(() => {
    const currentValue = getCurrentValue(file);
    if (currentValue instanceof MemoizedPromise) return undefined;
    return currentValue;
  });

  useEffect(() => {
    let cancelled = false;
    let timeout: number;

    const setMemoValue = async (newValue: MemoizedPromise<T>) => {
      try {
        const val = await newValue.get();
        if (!cancelled) setValue(val);
      } catch (error) {
        if (!cancelled) setError(error);
      }
    };

    const subscribe = (delay?: boolean) => {
      setError(undefined);

      const val = getCurrentValue(file);
      if (!(val instanceof MemoizedPromise)) {
        // Non-memoized-promise, can set directly.
        setValue(val);
        return;
      }

      if (!delay || val.done || options.throttle === 0) {
        setMemoValue(val);
      } else {
        timeout = window.setTimeout(() => {
          setMemoValue(val);
        }, options.throttle ?? DEFAULT_THROTTLE_TIMEOUT);
      }
    };

    subscribe(true);

    let unsubscribe: Function | undefined;

    if (eventType) unsubscribe = file.subscribe(eventType, subscribe);

    return () => {
      unsubscribe?.();
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [eventType, file, getCurrentValue, options.throttle]);

  return useMemo(() => [value, error, setValue], [error, value]);
}
