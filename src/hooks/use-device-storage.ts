import { useCallback, useEffect, useRef, useState } from "react";

/**
 * State mirrored to this browser's localStorage. Reads happen after mount so the
 * server render and first client render match.
 */
export function useDeviceStorage<T>(key: string, parse: (raw: unknown) => T, fallback: T) {
  const [value, setValue] = useState<T>(fallback);
  const [loaded, setLoaded] = useState(false);
  const parseRef = useRef(parse);
  const fallbackRef = useRef(fallback);

  useEffect(() => {
    let next = fallbackRef.current;
    try {
      const raw = window.localStorage.getItem(key);
      if (raw) next = parseRef.current(JSON.parse(raw));
    } catch {
      next = fallbackRef.current;
    }
    setValue(next);
    setLoaded(true);
  }, [key]);

  const update = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved = typeof next === "function" ? (next as (p: T) => T)(prev) : next;
        try {
          window.localStorage.setItem(key, JSON.stringify(resolved));
        } catch {
          // Storage can be full or blocked; the in-memory state still works.
        }
        return resolved;
      });
    },
    [key],
  );

  return [value, update, loaded] as const;
}
