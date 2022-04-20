import type { RefElementType } from '@muban/muban';
import { useEventListener } from '../useEventListener/useEventListener';
import type { DomElementOrRef, DomElementsOrRefCollection } from '../utils/util.types';
import { getElements } from '../utils/getElements';

/**
 * A small wrapper method to easily check if a user clicked inside a HTMLElement.
 *
 * @param target - The target there the user clicked.
 * @param container - The container where to check against.
 */
export function isClickedInside(target: EventTarget, container: RefElementType): boolean {
  return container ? container.contains(target as HTMLElement) : false;
}

/**
 * Will add an event listener to the body and will fire a callback if the user clicks
 * outside the provided container.
 *
 * @param container - The element or elements used to check if the user clicked outside.
 * @param callback - The callback that will be triggered if the user clicks outside the container.
 * @param options The options passed to `addEventListener`
 */
export function useClickedOutside<T extends RefElementType = HTMLElement>(
  container: DomElementOrRef<T> | DomElementsOrRefCollection<T>,
  callback: (event: MouseEvent) => void,
  options?: { capture?: boolean; passive?: boolean },
): void {
  function onDocumentClick(event: MouseEvent) {
    const { target } = event;
    const elements = getElements<T>(container);
    const match = target && elements.find((element) => isClickedInside(target, element));

    if (!match) {
      callback(event);
    }
  }

  useEventListener(document, 'click', onDocumentClick, options);
}
