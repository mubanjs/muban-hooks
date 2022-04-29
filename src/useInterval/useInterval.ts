import { onMounted, onUnmounted } from '@muban/muban';

/**
 *  A hook that can be used to call a function on a provided interval, by default the interval
 *  will run immediate. You can also start and cancel the interval whenever needed.
 *
 * @param callback The callback you want to trigger once the interval runs.
 * @param interval The duration of the interval you want to create.
 * @param startImmediate Whether or not you want to immediately start the interval.
 */
export const useInterval = (
  callback: () => void,
  interval: number = 100,
  startImmediate: boolean = true,
): { startInterval: () => void; stopInterval: () => void } => {
  let handle = -1;

  function start() {
    stop();
    handle = setInterval(callback, interval) as unknown as number;
  }

  function stop() {
    clearInterval(handle);
  }

  onUnmounted(() => {
    stop();
  });

  onMounted(() => {
    if (startImmediate) start();
  });

  return { startInterval: start, stopInterval: stop };
};