import type { ComputedRef } from '@muban/muban';
import { ref, onMounted, onUnmounted, computed } from '@muban/muban';

// We use `-1` as the value to indicate that an interval is not running.
const NOT_RUNNING = -1;

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
  isIntervalRunning: ComputedRef<boolean>;
} => {
  const intervalId = ref<number>(NOT_RUNNING);

  function start() {
    stop();
    intervalId.value = setInterval(callback, interval) as unknown as number;
  }

  function stop() {
    clearInterval(intervalId.value);
    intervalId.value = NOT_RUNNING;
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
    isIntervalRunning: computed(() => intervalId.value !== NOT_RUNNING),
  };
};
