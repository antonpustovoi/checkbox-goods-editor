import { useMemo, useRef } from "react";

import _debounce from "lodash/debounce";

export function useDebounce(callback, time) {
  const callbackRef = useRef(null);

  callbackRef.current = callback || (() => {});

  return useMemo(
    () => _debounce((...args) => callbackRef.current(...args), time),
    [time],
  );
}
