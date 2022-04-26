/* eslint-disable import/no-extraneous-dependencies */
import { defineComponent, refComponent } from '@muban/muban';
import type { Story } from '@muban/storybook/types-6-0';
import { html } from '@muban/template';
import { useEventListener } from './useEventListener';
import { useStorybookLog } from '../hooks/useStorybookLog';

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
      const [logBinding, log] = useStorybookLog(refs.label);

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

      return [logBinding];
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
