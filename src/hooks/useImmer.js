import { freeze, produce } from "immer";
import { useCallback, useState } from "react";

export function useImmer(initialValue) {
  const [value, setValue] = useState(() => freeze(initialValue, true));

  return [
    value,
    useCallback((updater) => {
      if (typeof updater === "function") setValue(produce(updater));
      else setValue(freeze(updater));
    }, []),
  ];
}
