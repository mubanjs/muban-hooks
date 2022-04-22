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
): { start: () => void; cancel: () => void } => {
  let handle = -1;

  function start() {
    cancel();
    handle = setTimeout(callback, duration) as unknown as number;
  }

  function cancel() {
    clearTimeout(handle);
  }

  onUnmounted(() => {
    cancel();
  });

  onMounted(() => {
    if (startImmediate) start();
  });

  return { start, cancel };
};
