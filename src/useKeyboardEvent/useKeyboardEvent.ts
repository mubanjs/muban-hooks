import type { Key } from 'ts-key-enum';
import { useEventListener } from '../useEventListener/useEventListener';
import type { EventTarget } from '../useEventListener/useEventListener';

export type KeyDownCallback = (event: GlobalEventHandlersEventMap['keydown']) => void;

/**
 * The Key enum contains values for all standard non-printable keys such as "CapsLock", "Backspace",
 * and "AudioVolumeMute". The enum does not contain values for printable keys such as "a", "A", "#",
 * "é", or "¿", simply because the list of possible values is too vast to include in a single enum.
 * To test for printable values, simply use a string comparison:
 *
 * See -> https://gitlab.com/nfriend/ts-key-enum#whats-included
 */
export type KeyboardEventKey = Key | string;

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
  keys: KeyboardEventKey | Array<KeyboardEventKey>,
  callback: KeyDownCallback,
  target: EventTarget = document,
): void {
  const onKeydown: KeyDownCallback = (event) => {
    if (Array.isArray(keys) ? keys.includes(event.key as Key) : event.key === keys) {
      callback(event);
    }
  };

  useEventListener(target, 'keydown', onKeydown);
}
