import { onMounted, onUnmounted } from '@muban/muban';
import { getElement } from '../utils/getElement';
import type { DomElementOrRef } from '../utils/util.types';

export type EventTarget = DomElementOrRef | Window | Document;
export type EventMap = WindowEventMap & DocumentEventMap & GlobalEventHandlersEventMap;

/**
 * A wrapper around the .addEventListener that automatically cleans up the listeners on component unmount.
 * When passing a Muban ref, it will try to get the DOM Element from the ref. When the ref is a
 * Component, it will use the root element of the component.
 *
 * @param target The object that will dispatch the events, does also support Muban refs
 * @param eventName The name of the event we want to listen to, e.g. 'click'
 * @param callback The function to invoke when the event is dispatched
 * @param options The options passed to `addEventListener`
 */
export function useEventListener<K extends keyof EventMap>(
  target: EventTarget,
  eventName: K,
  callback: (event: EventMap[K]) => void,
  options?: { capture?: boolean; passive?: boolean },
): void {
  // Store the target element, so we are sure we remove the correct one later on.
  let targetElement: HTMLElement | Window | Document | undefined;

  // The window and document return different types and this causes type mismatches in the
  // event callbacks therefore we have these if-statements and internally cast the callback to
  // a generic EventListener
  onMounted(() => {
    if (target === window || target === document) {
      targetElement = target;
      return target.addEventListener?.(eventName, callback as EventListener, options);
    }

    targetElement = getElement(target as DomElementOrRef);
    return targetElement?.addEventListener?.(eventName, callback as EventListener, options);
  });

  onUnmounted(() => {
    return targetElement?.removeEventListener(eventName, callback as EventListener, options);
  });
}
