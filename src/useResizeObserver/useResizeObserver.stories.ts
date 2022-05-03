/* eslint-disable import/no-extraneous-dependencies */
import { bind, computed, defineComponent, ref } from '@muban/muban';
import type { Story } from '@muban/storybook/types-6-0';
import { html } from '@muban/template';
import { useResizeObserver } from './useResizeObserver';
import { useStorybookLog } from '../hooks/useStorybookLog';

export default {
  title: 'useResizeObserver',
};

export const Demo: Story = () => ({
  component: defineComponent({
    name: 'story',
    refs: {
      testArea: 'test-area',
      label: 'label',
      resizeButton: 'resize-button',
    },
    setup({ refs }) {
      const [logBinding, log] = useStorybookLog(refs.label);
      const width = ref(100);

      function onResizeObserverUpdate(): void {
        log('resize observer triggered');
      }

      useResizeObserver(refs.testArea, onResizeObserverUpdate, 100);

      return [
        logBinding,
        bind(refs.testArea, {
          style: {
            width: computed(() => `${width.value}%`),
          },
        }),
        bind(refs.resizeButton, {
          click() {
            const newWidth = width.value - 25;
            width.value = newWidth > 0 ? newWidth : 100;
          },
        }),
      ];
    },
  }),
  template: () => html`<div data-component="story">
    <div class="alert alert-primary">
      <h4 class="alert-heading">Instructions!</h4>
      <p>Resize the window or click on the resize button to see the events being triggered.</p>
      <p class="mb-0">
        Note: The <code>callback</code> is debounced by <u>100ms</u> to avoid it from being called
        way too much for the sake of the demo.
      </p>
    </div>
    <div data-ref="label" />
    <div class="card border-dark" data-ref="test-area">
      <div class="card-header">Test Area</div>
      <div class="card-body">
        <p>
          The resize observer is attached to this element, so it will trigger the callback method if
          it's resized.
        </p>
        <button type="button" data-ref="resize-button" class="btn btn-success">Resize</button>
      </div>
    </div>
  </div>`,
});
Demo.storyName = 'demo';
