# @muban/hooks

Commonly used hooks for Muban using the Vue Composition API.

## Getting started

### Installing

Add `@muban/hooks` to your project:
```sh
yarn add @muban/hooks
```

### Example

Use a hook inside a component:

```ts
import { useToggle } from '@muban/hooks';

const MyComponent = defineComponent({
  name: 'my-component',
  setup({ refs }) {
    const [state, toggle] = useToggle(false);
    
    return [
      bind(refs.self, {
        value: state,
        click() {
          toggle();
        }
      })
    ];
  }
});
```

## Docs

[https://mubanjs.github.io/muban-hooks/](https://mubanjs.github.io/muban-hooks/)

## Development

The information below should help you develop new hooks in this library.

Run `npm run test -- --watch` to run all unit tests in watch mode.

Run `npm run storybook` to preview your stories and documentation.

### Folder Structure

`useHookName`
* `useHookName.ts` – The Hook itself
* `useHookName.stories.ts` – To showcase the hook with a working UI, also used for dom testing
* `useHookName.stories.mdx` – Documentation about the hook
* `useHookName.test.ts` – Unit tests for the hook
* `useHookNameStories.test.ts` – Unit tests for the stories using `testing-library`

### Steps for adding a new Hook:

* Create a new folder and a new `ts` file with the hook
  * Use the `use` prefix for the name of the hook
  * Use named exports to export the hook
  * Enter JSDoc for description and parameters
* Re-export the hook in the `index.ts`
* Add a markdown file documenting the hook
  * General description
  * Reference for types, parameters, return type
  * Simple and extended use cases
* Add a story file to test out the hook
  * Add an instructions banner at the top of the story
  * Create a type for the StoryArgs that match the template, so it can be used when rendering 
    the Story inside tests.
* Add unit tests for the hook
* Add unit tests for the Stories


## Writing Unit test

If your hook doesn't use any lifecycle hooks, the hook can be tested in the same way as any other 
function.

However, if `onMounted` or `onUnmounted` are used in your hook, then the test requires a custom 
setup.

### Mocking muban lifecycle hooks

In order to test hooks in isolation, we need to mock the `onMounted` and `onUnmounted` hooks.
This can be done by adding this at the top of your test file:

```ts
jest.mock('@muban/muban', () => getMubanLifecycleMock());
```

Because the above line mocks all imports to `@muban/muban`, any other legit import to muban you
want to do will also be mocked.

- If you want to do other imports to muban in your hooks, they should be added to the
  `getMubanLifecycleMock` implementation to make your tests run.
- If you want to do other imports to muban in your test code, you should import from
  `@muban/test-mock` instead. This is an alias to the same muban library, but unaffected by the
  mocks.
- Any nested import (e.g. `@muban/muban/lib/Component`) is unaffected

### Run Component Lifecycle 

The `runComponentSetup` can be used to execute your hook inside a mocked component lifecycle, so 
calls to those lifecycle hooks work as expected. It has two parameters, both functions.

The first `setup` function is similar to your component setup, where you initialize your hook, 
set up potential watchers, etc.

```ts
// example with only a `setup` function.
runComponentSetup(() => {
  useEventListener(target, 'click', () => undefined);
});
```

The second `run` function allows you to fake interaction. Like clicking on elements, changing 
form inputs, or anything else that would normally happen in your component that could trigger 
logic inside your hook. This function can be `async` in case you need this.

```ts
// example with a `run` function to trigger a click event
await runComponentSetup(
  () => {
    useEventListener(target, 'click', mockHandler);
  },
  () => {
    target.dispatchEvent(new MouseEvent('click'));
  },
);
```

The `onMounted` is called after the `setup` function, and the `onUnmounted` is called after the 
(optional) `run` function.

Jest `expect` can be done after the `runComponentSetup`, or potentially inside the two functions 
if intermediate state requires testing.

## Writing Story tests

Use the `render` function to render a Story component in the DOM, and use the "testing-library"
query, event and assert functions to test if your Story works as intended.

Add `import '@testing-library/jest-dom';` to the top of your file to augment Jest with
additional matchers for DOM elements.

Story tests are located in a separate file from the normal unit tests, since they render actual
components. The unit test files mock most of muban, which prevents rendering story components.

```ts
// `Demo` is an exported story from `.stories.ts` file
// The returned object contains queries that are bound to your component's container
const { getByRef, getByText } = render(Demo);

// from here on, just interact with and test against the DOM
const label = getByRef('label');
expect(label).toHaveTextContent(/^false$/i);

const enableButton = getByText('Enable');
enableButton.click();

// after having interacted with the dom, use `waitFor` to make sure
// the DOM is updated after interaction
await waitFor(() => expect(label).toHaveTextContent(/^true$/i));
```
