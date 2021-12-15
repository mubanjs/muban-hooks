/**
 * This helper method can be used to standardize the converting of Muban refs to HTMLElements,
 * this can be very useful when creating utils that support Refs and HTMLElements as the source.
 */
import type { DomElementOrRef } from './util.types';

export function getElement<T extends HTMLElement = HTMLElement>(
  source: DomElementOrRef,
): T | undefined {
  if (source instanceof HTMLElement) return source as T;
  if (source.type === 'component') return source.component?.element as T;
  if (source.type === 'element') return source.element as T;

  return undefined;
}
