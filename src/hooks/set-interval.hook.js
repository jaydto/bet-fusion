import React, { useState, useMemo, useRef } from 'react';

const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  useMemo(() => {
    savedCallback.current = callback;
  }, [callback]);

  useMemo(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
export default useInterval;
