import { useEffect, useRef } from 'react';

export default function useCurrentRef<T>(toRef: T) {
  const toRefRef = useRef<T>(toRef);
  useEffect(() => {
    toRefRef.current = toRef;
  });
  return toRefRef;
}
