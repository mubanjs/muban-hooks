import type { Ref } from '@muban/muban';
import { ref, onMounted, onUnmounted, readonly } from '@muban/muban';

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
): {
  startInterval: () => void;
  stopInterval: () => void;
  isIntervalRunning: Readonly<Ref<boolean>>;
} => {
  const isIntervalRunning = ref(false);
  let intervalId = -1;

  function start() {
    stop();
    intervalId = setInterval(callback, interval) as unknown as number;
    isIntervalRunning.value = true;
  }

  function stop() {
    clearInterval(intervalId);
    isIntervalRunning.value = false;
  }

  onUnmounted(() => {
    stop();
  });

  onMounted(() => {
    if (startImmediate) start();
  });

  return {
    startInterval: start,
    stopInterval: stop,
    isIntervalRunning: readonly(isIntervalRunning),
  };
};
