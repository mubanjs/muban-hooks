import type { ComputedRef } from '@muban/muban';
import { computed, onMounted, onUnmounted, ref } from '@muban/muban';

// We use `-1` as the value to indicate that an interval is not running.
const NOT_RUNNING = -1;

/**
 *  A hook that can be used to apply a timeout to a certain function but also give you the option
 *  to cancel it before it's executed.
 *
 * @param callback The callback you want to trigger once the timeout is completed.
 * @param duration The duration of the timeout you want to create.
 * @param startImmediate Whether or not you want to immediately start the timeout.
 */
export const useTimeout = (
  callback: () => void,
  duration: number = 100,
  startImmediate: boolean = true,
): {
  startTimeout: () => void;
  clearTimeout: () => void;
  isTimeoutRunning: ComputedRef<boolean>;
} => {
  const timeoutId = ref(NOT_RUNNING);

  function start() {
    clear();
    timeoutId.value = setTimeout(() => {
      timeoutId.value = NOT_RUNNING;
      callback();
    }, duration) as unknown as number;
  }

  function clear() {
    clearTimeout(timeoutId.value);
    timeoutId.value = NOT_RUNNING;
  }

  onUnmounted(() => {
    clear();
  });

  onMounted(() => {
    if (startImmediate) start();
  });

  return {
    startTimeout: start,
    clearTimeout: clear,
    isTimeoutRunning: computed(() => timeoutId.value !== NOT_RUNNING),
  };
};
