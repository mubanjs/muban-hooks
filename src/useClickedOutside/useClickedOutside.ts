import type { RefElementType } from '@muban/muban';
import { useEventListener } from '../useEventListener/useEventListener';
import type { DomElementOrRef, DomElementsOrRefCollection } from '../utils/util.types';
import { getElements } from '../utils/getElements';

/**
 * A small wrapper method to easily check if a user clicked inside an Element.
 *
 * @param target - The target that the user has clicked on.
 * @param container - The container element that we expect to contain the `target` element.
 */
export function isClickedInside(target: Element, container: Element): boolean {
  return container ? container.contains(target) : false;
}

/**
 * Will add an event listener to the document and will fire a callback if the user clicks
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
    const match = target && elements.some((element) => isClickedInside(target as Element, element));

    if (!match) {
      callback(event);
    }
  }

  useEventListener(document, 'click', onDocumentClick, options);
}
