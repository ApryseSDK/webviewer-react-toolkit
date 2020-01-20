import { useEffect, useState } from 'react';
import { FileEventType, FileLike, MemoizedPromise } from '../data';
import { DEFAULT_THROTTLE_TIMEOUT } from '../utils';

export interface UseFileSubscribeOptions {
  /** The timeout to throttle by if unfetched memo promise. Default: 500ms. */
  throttle?: number;
  /** Fired when async promise fails. */
  onFailed?: (error: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
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
  const valueStateArray = useState<T | undefined>(() => {
    const currentValue = getCurrentValue(file);
    if (currentValue instanceof MemoizedPromise) return undefined;
    return currentValue;
  });

  const [, setValue] = valueStateArray;

  useEffect(() => {
    let cancelled = false;
    let timeout: number;

    const setMemoValue = async (newValue: MemoizedPromise<T>) => {
      try {
        const val = await newValue.get();
        if (!cancelled) setValue(val);
      } catch (error) {
        options.onFailed?.(error);
      }
    };

    const subscribe = () => {
      const val = getCurrentValue(file);
      if (!(val instanceof MemoizedPromise)) {
        // Non-memoized-promise, can set directly.
        setValue(val);
      } else if (val.done || options.throttle === 0) {
        setMemoValue(val);
      } else {
        timeout = window.setTimeout(() => {
          setMemoValue(val);
        }, options.throttle ?? DEFAULT_THROTTLE_TIMEOUT);
      }
    };

    subscribe();

    if (eventType) file.addEventListener(eventType, subscribe);

    return () => {
      if (eventType) file.removeEventListener(eventType, subscribe);
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [eventType, file, getCurrentValue, setValue, options.onFailed, options.throttle]);

  return valueStateArray;
}
