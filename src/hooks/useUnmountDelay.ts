import { useEffect, useMemo, useState } from 'react';

export function useUnmountDelay(on = false, delay = 250) {
  const [mounted, setMounted] = useState(on);

  useEffect(() => {
    if (!on) {
      const timeoutId = window.setTimeout(() => {
        setMounted(false);
      }, delay);

      return () => window.clearTimeout(timeoutId);
    }
    setMounted(true);
    return;
  }, [delay, on]);

  const value = useMemo(
    () => ({
      mounted,
      unmounting: mounted && !on,
    }),
    [mounted, on],
  );

  return value;
}
