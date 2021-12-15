/**
 * Similar to the `getElement` but then applicable to ref collections..
 */
import type { DomElementsOrRefCollection } from './util.types';

export function getElements(source: DomElementsOrRefCollection): ReadonlyArray<HTMLElement> {
  if (Array.isArray(source)) return source;

  if (source.type === 'collection') return source.getElements();
  if (source.type === 'componentCollection')
    return source.getComponents().map(({ element }) => element);

  return [];
}
