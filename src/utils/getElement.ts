import type { RefElementType } from '@muban/muban';
import type { DomElementOrRef } from './util.types';

/**
 * This helper method can be used to standardize the converting of Muban refs to HTMLElements,
 * this can be very useful when creating utils that support Refs and HTMLElements as the source.
 */
export function getElement<T extends RefElementType = HTMLElement>(
  source: DomElementOrRef<T>,
): T | undefined {
  if (source instanceof HTMLElement || source instanceof SVGElement) return source as T;
  if (source.type === 'component') return source.component?.element as T;
  if (source.type === 'element') return source.element as T;

  return undefined;
}
