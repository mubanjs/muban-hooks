import { Key } from 'ts-key-enum';
import type { KeyDownCallback } from '../useKeyboardEvent/useKeyboardEvent';
import { useKeyboardEvent } from '../useKeyboardEvent/useKeyboardEvent';

/**
 * A shorthand for adding an event listener for the `Escape` key, this is the most common
 * implementation for opening overlays and making sure they are closable through keyboard usage.
 *
 * @param callback The function to invoke when the `Escape` key is pressed.
 */
export function useEscapeKeyEvent(callback: KeyDownCallback): void {
  useKeyboardEvent(Key.Escape, callback);
}
