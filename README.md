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
