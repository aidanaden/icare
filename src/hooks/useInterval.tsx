import { useRef, useEffect, useCallback } from "react";

// Implementation
const useInterval = (fn: () => void, delay?: number) => {
  const savedFunctionbackRef = useRef(fn);
  const intervalIdRef = useRef<any>();

  // store ref of function on every change
  useEffect(() => {
    savedFunctionbackRef.current = fn;
  }, [fn]);

  // if delay value changes while ref has already been set an interval fn,
  // clear previous interval before setting new interval fn
  useEffect(() => {
    const tick = () => {
      savedFunctionbackRef.current();
    };

    if (delay !== null) {
      intervalIdRef.current = setInterval(tick, delay);
    }

    const id = intervalIdRef.current;
    return () => {
      clearInterval(id);
    };
  }, [delay]);

  // clear interval fn stored in ref on unmount
  useEffect(() => {
    const id = intervalIdRef.current;
    return () => {
      clearInterval(id);
    };
  }, []);

  const resetInterval = useCallback(() => {
    clearInterval(intervalIdRef.current);
    intervalIdRef.current = setInterval(savedFunctionbackRef.current, delay);
  }, [delay]);

  return resetInterval;
};

export default useInterval;
