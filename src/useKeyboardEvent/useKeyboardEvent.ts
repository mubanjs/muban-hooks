import { useEventListener } from '../useEventListener/useEventListener';
import type { EventTarget } from '../useEventListener/useEventListener';

export type KeyDownCallback = (event: GlobalEventHandlersEventMap['keydown']) => void;

/**
 * A wrapper around the .addEventListener that automatically cleans up the listeners on component unmount.
 * When passing a Muban ref, it will try to get the DOM Element from the ref. When the ref is a
 * Component, it will use the root element of the component.
 *
 * @param keys The key(s) that you want to listen for.
 * @param callback The function to invoke when the one of the keys is pressed.
 * @param target The target on which the listener is bound, by default the document.
 */
export function useKeyboardEvent(
  keys: string | Array<string>,
  callback: KeyDownCallback,
  target: EventTarget = document,
): void {
  const onKeydown: KeyDownCallback = (event) => {
    if (Array.isArray(keys) ? keys.includes(event.key) : event.key === keys) {
      callback(event);
    }
  };

  useEventListener(target, 'keydown', onKeydown);
}
