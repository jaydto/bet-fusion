import {useEffect, useMemo, useRef} from 'react';
import useIsomorphicLayoutEffect from 'use-isomorphic-layout-effect';

const useInterval = (callback, delay) => {
  const savedCallback = useRef(callback);

  // useMemo(() => {
  //   savedCallback.current = callback;
  // }, [callback]);
  //
  // useMemo(() => {
  //   function tick() {
  //     savedCallback.current();
  //   }
  //
  //   if (delay !== null) {
  //     let id = setInterval(tick, delay);
  //     return () => clearInterval(id);
  //   }
  // }, [delay]);

  useIsomorphicLayoutEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    // Don't schedule if no delay is specified.
    // Note: 0 is a valid value for delay.
    if (!delay && delay !== 0) {
      return
    }

    const id = setInterval(() => savedCallback.current(), delay)

    return () => clearInterval(id)
  }, [delay])
}
export default useInterval;
