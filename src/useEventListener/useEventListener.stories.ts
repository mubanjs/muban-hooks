/* eslint-disable unicorn/prevent-abbreviations,import/no-extraneous-dependencies */
// import UseToggleDocs from './useEventListener.docs.mdx';

import { bind, computed, defineComponent, reactive, refComponent, watch } from '@muban/muban';
import type { Story } from '@muban/storybook/dist/client/preview/types-6-0';
import { html } from '@muban/template';
import { useEventListener } from './useEventListener';

export default {
  title: 'useEventListener',
};

const Test = defineComponent({
  name: 'test',
  setup() {
    return [];
  },
});

export const Demo: Story = () => ({
  component: defineComponent({
    name: 'story',
    refs: {
      label: 'label',
      element: 'element',
      component: refComponent(Test),
    },
    setup({ refs }) {
      const state = reactive<Array<string>>([]);

      const log = (message: string) => {
        state.push(message);
        setTimeout(() => {
          state.splice(0, 1);
        }, 2000);
      };

      useEventListener(window, 'click', () => {
        log('clicked the window');
      });
      useEventListener(refs.self, 'click', () => {
        log('clicked the story');
      });
      useEventListener(refs.element, 'click', () => {
        log('clicked the element');
      });
      useEventListener(refs.component, 'click', () => {
        log('clicked the component');
      });

      return [
        bind(refs.label, {
          html: computed(() =>
            state
              .map((msg) => html`<div class="alert alert-dismissible alert-info">${msg}</div>`)
              .join(''),
          ),
        }),
      ];
    },
  }),
  template: () => html`<div data-component="story" data-initial-value="true">
    <div class="alert alert-primary">
      <h4 class="alert-heading">Instructions!</h4>
      <p class="mb-0">Click anywhere to see events being triggered</p>
    </div>
    <div data-ref="label" />
    <div class="card border-dark">
      <div class="card-header">Test Area</div>
      <div class="card-body">
        <span data-ref="element" class="badge rounded-pill bg-primary">element</span>
        <span data-component="test" class="badge rounded-pill bg-primary">component</span>
      </div>
    </div>
  </div>`,
});
Demo.storyName = 'demo';
