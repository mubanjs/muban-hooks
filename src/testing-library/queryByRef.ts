import { queryHelpers } from '@testing-library/dom';
import type { Matcher, MatcherOptions } from '@testing-library/dom/types/matches';

/*
 * Helper functions to find elements using the `data-ref` attribute
 */

export const queryByRef = queryHelpers.queryByAttribute.bind(null, 'data-ref');
export const queryAllByRef = queryHelpers.queryAllByAttribute.bind(null, 'data-ref');

export function getAllByRef(container: HTMLElement, ref: Matcher, options?: MatcherOptions) {
  const els = queryAllByRef(container, ref, options ?? {});
  if (els.length === 0) {
    throw queryHelpers.getElementError(
      `Unable to find an element by: [data-ref="${ref}"]`,
      container,
    );
  }
  return els;
}

export function getByRef(container: HTMLElement, ref: Matcher, options?: MatcherOptions) {
  // result >= 1
  const result = getAllByRef(container, ref, options ?? {});
  if (result.length > 1) {
    throw queryHelpers.getElementError(
      `Found multiple elements with the [data-ref="${ref}"]`,
      container,
    );
  }
  return result[0];
}
