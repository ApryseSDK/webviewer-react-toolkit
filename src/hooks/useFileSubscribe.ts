import { useEffect, useMemo, useRef, useState } from 'react';
import { FileEventType, FileLike, MemoizedPromise } from '../data';
import GlobalQueue from '../work/GlobalQueue';

/**
 * Will subscribe to a value from a file and return the value, as well as any
 * async errors.
 * @param file The file to subscribe to.
 * @param getCurrentValue Function to extract the current value from the file.
 * @param eventType The event type to subscribe. Won't subscribe if not given.
 * @param throttle The timeout to throttle initial fetch of value. Default: 500ms.
 */
export function useFileSubscribe<F extends FileLike, T>(
  file: F,
  getCurrentValue: (file: F) => T | MemoizedPromise<T>,
  eventType?: FileEventType,
) {
  const getValue = useRef(getCurrentValue);

  const [error, setError] = useState<any>();
  const [value, setValue] = useState<T | undefined>(() => {
    const currentValue = getValue.current(file);
    if (currentValue instanceof MemoizedPromise) return undefined;
    return currentValue;
  });

  useEffect(() => {
    let cancelled = false;
    let cancel: () => void;

    const setMemoValue = (val: T) => {
      try {
        if (!cancelled) setValue(val);
      } catch (error) {
        if (!cancelled) setError(error);
      }
    };

    const subscribe = () => {
      setError(undefined);

      const val = getValue.current(file);
      if (!(val instanceof MemoizedPromise)) {
        // Non-memoized-promise, can set directly.
        setValue(val);
        return;
      }

      setValue(undefined);

      if (val.done) {
        val.get().then(setMemoValue)
      } else {
        const r = GlobalQueue.process<T>(() => val.get());
        cancel = r[1];
        r[0].then((result: T) => {
          setMemoValue(result);
        });
      }
    };

    subscribe();

    let unsubscribe: (() => void) | undefined;

    if (eventType) unsubscribe = file.subscribe(eventType, subscribe);

    return () => {
      cancel?.();
      unsubscribe?.();
      cancelled = true;
    };
  }, [eventType, file]);

  return useMemo(() => [value, error, setValue], [error, value]);
}
