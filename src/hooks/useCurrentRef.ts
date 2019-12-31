import { useRef, useEffect } from 'react';

function useCurrentRef<T>(toRef: T) {
  const toRefRef = useRef<T>(toRef);
  useEffect(() => {
    toRefRef.current = toRef;
  });
  return toRefRef;
}

export default useCurrentRef;
