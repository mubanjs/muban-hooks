import type { DomElementsOrRefCollection } from './util.types';

/**
 * This helper method can be used to standardize the converting of Muban refs to HTMLElements,
 * this can be very useful when creating utils that support Refs and HTMLElements as the source.
 *
 * Similar to the `getElement` but then applicable to ref collections.
 */
export function getElements(source: DomElementsOrRefCollection): ReadonlyArray<HTMLElement> {
  if (Array.isArray(source)) return source;

  if (source.type === 'collection') return source.getElements();
  if (source.type === 'componentCollection')
    return source.getComponents().map(({ element }) => element);

  return [];
}
