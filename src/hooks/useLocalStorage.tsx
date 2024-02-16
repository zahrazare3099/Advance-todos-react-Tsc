import { useEffect, useState } from "react";

export default function useLocalStorage<T>(
  key: string,
  initialValue: T | (() => T)
) {
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(key);
    // console.log(jsonValue, typeof jsonValue, Boolean(jsonValue));

    if (jsonValue == null) {
      if (typeof initialValue === "function") {
        return (initialValue as () => T)();
      } else {
        // console.log("inn", initialValue);
        return initialValue;
      }
    } else if (jsonValue !== undefined) {
      return initialValue;
    } else {
      // console.log("parse", jsonValue == "undefined", initialValue);
      return JSON.parse(jsonValue);
    }
  });
  // else if (jsonValue == "undefined") {
  //   console.log("inja", jsonValue == "undefined", initialValue);
  //   return initialValue;
  // }
  console.log(value, "val");

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue] as [T, typeof setValue];
}
