import { useRef, useEffect, useCallback } from "react";

// Implementation
const useInterval = (callback: () => void, delay?: number) => {
  const savedCallbackRef = useRef(callback);
  const intervalIdRef = useRef<any>();

  useEffect(() => {
    savedCallbackRef.current = callback;
  }, [callback]);

  // handle tick
  useEffect(() => {
    const tick = () => {
      savedCallbackRef.current();
    };

    if (delay !== null) {
      intervalIdRef.current = setInterval(tick, delay);
    }

    const id = intervalIdRef.current;
    return () => {
      clearInterval(id);
    };
  }, [delay]);

  // handle unmount
  useEffect(() => {
    const id = intervalIdRef.current;
    return () => {
      clearInterval(id);
    };
  }, []);

  const resetInterval = useCallback(() => {
    clearInterval(intervalIdRef.current);
    intervalIdRef.current = setInterval(savedCallbackRef.current, delay);
  }, [delay]);

  return resetInterval;
};

export default useInterval;
