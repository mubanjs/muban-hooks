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

Steps for adding a new Hook:
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
* Add unit tests
