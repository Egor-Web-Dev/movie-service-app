import type Function from "../types/Function";

function throttle<T extends Function>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: NodeJS.Timeout | null;

  return (...args: Parameters<T>) => {
    if (timer) return;

    timer = setTimeout(() => {
      fn(...args);

      timer = null;
    }, delay);
  };
}

export default throttle;
