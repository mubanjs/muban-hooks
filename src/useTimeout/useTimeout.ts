import { onMounted, onUnmounted } from '@muban/muban';

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
): { startTimeout: () => void; cancelTimeout: () => void } => {
  let timeoutId = -1;

  function start() {
    cancel();
    timeoutId = setTimeout(callback, duration) as unknown as number;
  }

  function cancel() {
    clearTimeout(timeoutId);
  }

  onUnmounted(() => {
    cancel();
  });

  onMounted(() => {
    if (startImmediate) start();
  });

  return { startTimeout: start, cancelTimeout: cancel };
};
