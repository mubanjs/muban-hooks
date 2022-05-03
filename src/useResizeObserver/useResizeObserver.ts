import { onMounted, onUnmounted, watchEffect } from '@muban/muban';
import { debounce } from 'lodash-es';
import type { DomElementOrRef } from '../utils/util.types';
import { getElement } from '../utils/getElement';

const resizeObserverInstanceCallbacks = new Map<Element, ResizeObserverCallback>();
let resizeObserverInstance: ResizeObserver;

/**
 * We create only one ResizeObserver instance, and we create it on demand. This way we keep the
 * amount of observers to a minimum.
 */
function getResizeObserverInstance(): ResizeObserver {
  if (!resizeObserverInstance) {
    resizeObserverInstance = new ResizeObserver((entries, observer) => {
      entries.forEach((entry) => {
        resizeObserverInstanceCallbacks.get(entry.target)?.([entry], observer);
      });
    });
  }
  return resizeObserverInstance;
}

/**
 * This helper method makes it easy to add a `DomElementOrRef` to the `resizeObserverInstance`.
 *
 * @param source The source that you want to observe for resizes.
 * @param callback The function to invoke when the element is resized.
 */
function addToResizeObserver(source: DomElementOrRef, callback: ResizeObserverCallback): void {
  const element = getElement(source);
  const resizeObserver = getResizeObserverInstance();

  if (element) {
    resizeObserverInstanceCallbacks.set(element, callback);
    resizeObserver.observe(element);
  }
}

/**
 * This helper method makes it easy to remove a `DomElementOrRef` from the `resizeObserverInstance`.
 *
 * @param source The source that you want to unobserve for resizes.
 */
function removeFromResizeObserver(source: DomElementOrRef): void {
  const element = getElement(source);
  const resizeObserver = getResizeObserverInstance();

  if (element) {
    resizeObserver.unobserve(element);
    resizeObserverInstanceCallbacks.delete(element);
  }
}

/**
 * A wrapper around the native ResizeObserver that automatically cleans up when unmounted. It reuses
 * the same instance when applied on a specific element to reduce the amount of instances created.
 *
 * @param source The DOM Element or Ref that you want to observe for resizes.
 * @param callback The function to invoke when the element is resized.
 * @param debounceTime The mount of debounce you want to apply to the callback function.
 */
export const useResizeObserver = (
  source: DomElementOrRef,
  callback: ResizeObserverCallback,
  debounceTime?: number,
): void => {
  const debouncedCallback = debounce(callback, debounceTime);

  if (source instanceof HTMLElement || source instanceof SVGElement) {
    onMounted(() => {
      addToResizeObserver(source, debouncedCallback);
    });

    onUnmounted(() => {
      removeFromResizeObserver(source);
    });
  } else {
    const removeWatchEffect = watchEffect(() => {
      removeFromResizeObserver(source);
      addToResizeObserver(source, debouncedCallback);
    });

    onUnmounted(() => {
      removeWatchEffect();
    });
  }
};
