/* eslint-disable @typescript-eslint/no-explicit-any */
import { getQueriesForElement, prettyDOM, queries } from '@testing-library/dom';
import type { StoryFnMubanReturnType } from '@muban/storybook/dist/esm/client/preview/types';
import type { Story } from '@muban/storybook/types-6-0';
import { createApp } from '@muban/test-mock';
import type { BaseStoryFn } from '@storybook/addons/dist/ts3.9/types';
import type { PrettyDOMOptions } from '@testing-library/dom/types/pretty-dom';
import * as refQueries from './queryByRef';

type StoryArgs<T extends Story> = T extends BaseStoryFn<infer R, StoryFnMubanReturnType>
  ? R
  : Record<string, any>;

const mountedWrappers = new Set<HTMLDivElement>();

/**
 * Render a Muban Story into `document.body`, so tests can be run after.
 * @param componentFactory A Muban Story (function that returns a component definition object).
 * @param [templateData] An optional object with data that is used by the template to render the
 * initial HTML markup.
 *
 * @returns { container, debug, unmount, html, ...queries} An object of useful information and helpers.
 *
 * - `container` HTML Element that the component is rendered in.
 * - `debug` A function that outputs a pretty version of the component HTML.
 * - `unmount` Removes the container from the HTML so the component will be unmounted
 * - `html` Returns the raw outerHTML
 * - `...queries` All element queries bound to the component container
 */
export function render<T extends Story>(componentFactory: T, templateData?: StoryArgs<T>) {
  if (typeof componentFactory !== 'function') {
    throw new TypeError('Story must be a function');
  }
  const { component, appComponents, template } = (
    componentFactory as () => StoryFnMubanReturnType
  )();

  const container = document.createElement('div');
  document.body.appendChild(container);

  if (component) {
    const app = createApp(component);
    app.component(...(appComponents || []));

    app.mount(container, template, templateData);
  } else {
    // only render the basic template
    const result = template(templateData);
    container.innerHTML = Array.isArray(result) ? result.join('') : result;
  }

  mountedWrappers.add(container);

  return {
    container,
    debug: (element = container, ...args: [number?, PrettyDOMOptions?]) =>
      // eslint-disable-next-line no-console
      console.log(prettyDOM(element, ...args)),
    unmount: () => container.remove(),
    html: () => container.outerHTML,
    ...getQueriesForElement(container, { ...queries, ...refQueries }),
  };
}

export function cleanup() {
  mountedWrappers.forEach(cleanupAtWrapper);
}

function cleanupAtWrapper(wrapper: HTMLDivElement) {
  if (wrapper.parentNode && wrapper.parentNode.parentNode === document.body) {
    document.body.removeChild(wrapper.parentNode);
  }

  try {
    wrapper.remove();
  } finally {
    mountedWrappers.delete(wrapper);
  }
}

// If we're running in a test runner that supports afterEach then we'll
// automatically run cleanup after each test.
// This ensures that tests run in isolation from each other.
// If you don't like this, set the VTL_SKIP_AUTO_CLEANUP variable to 'true'.
if (typeof afterEach === 'function' && !process.env.VTL_SKIP_AUTO_CLEANUP) {
  afterEach(() => {
    cleanup();
  });
}
