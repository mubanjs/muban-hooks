import type { RefElementType } from '@muban/muban';
import type { DomElementOrRef, DomElementsOrRefCollection } from './util.types';
import { getElement } from './getElement';

/**
 * This helper method can be used to standardize the converting of Muban refs to HTMLElements,
 * this can be very useful when creating utils that support Refs and HTMLElements as the source.
 *
 * Similar to the `getElement` but it also supports collections and will always return an Array.
 */
export function getElements<T extends RefElementType = HTMLElement>(
  source: DomElementsOrRefCollection<T> | DomElementOrRef<T>,
): ReadonlyArray<T> {
  if (Array.isArray(source)) return source;

  if (
    source instanceof HTMLElement ||
    source instanceof SVGElement ||
    source.type === 'element' ||
    source.type === 'component'
  )
    return [getElement(source as DomElementOrRef<T>)].filter(Boolean) as Array<T>;

  if (source.type === 'collection') return source.getElements();
  if (source.type === 'componentCollection')
    return source.getComponents().map(({ element }) => element as T);

  return [];
}
