/* eslint-disable unicorn/prevent-abbreviations,import/no-extraneous-dependencies */
import { bind, computed, defineComponent, propType, ref } from '@muban/muban';
import type { Story } from '@muban/storybook/types-6-0';
import { html } from '@muban/template';
import { useTimeout } from './useTimeout';
import { useStorybookLog } from '../hooks/useStorybookLog';

export default {
  title: 'useTimeout',
};

type DemoStoryProps = { startImmediate?: boolean; duration?: number };

export const Demo: Story<DemoStoryProps> = () => ({
  component: defineComponent({
    name: 'story',
    props: {
      startImmediate: propType.boolean.defaultValue(false),
      duration: propType.number,
    },
    refs: {
      label: 'label',
      startButton: 'start-button',
      cancelButton: 'cancel-button',
    },
    setup({ refs, props }) {
      const [logBinding, log] = useStorybookLog(refs.label);
      const isTimeoutRunning = ref(false);

      function onTimeoutComplete() {
        isTimeoutRunning.value = false;
        log('timeout complete');
      }

      const { startTimeout, cancelTimeout } = useTimeout(
        onTimeoutComplete,
        props.duration,
        props.startImmediate,
      );

      return [
        logBinding,
        bind(refs.startButton, {
          attr: {
            disabled: isTimeoutRunning,
          },
          click() {
            isTimeoutRunning.value = true;
            startTimeout();
          },
        }),
        bind(refs.cancelButton, {
          attr: {
            disabled: computed(() => !isTimeoutRunning.value),
          },
          click() {
            isTimeoutRunning.value = false;
            log('canceled timeout');
            cancelTimeout();
          },
        }),
      ];
    },
  }),
  template: ({ startImmediate = false, duration = 1000 }: DemoStoryProps = {}) => html`<div
    data-component="story"
    data-start-immediate=${startImmediate}
    data-duration=${duration}
  >
    <div class="alert alert-primary">
      <h4 class="alert-heading">Instructions!</h4>
      <p class="mb-0">
        The demo timeout is set to 1 second, you can start it by clicking the start button. You can
        cancel the timeout by clicking the cancel button.
      </p>
    </div>
    <div data-ref="label" />
    <div class="card border-dark">
      <div class="card-header">Test Area</div>
      <div class="card-body">
        <button type="button" data-ref="start-button" class="btn btn-primary">Start timeout</button>
        ${' '}
        <button type="button" data-ref="cancel-button" class="btn btn-danger">
          Cancel timeout
        </button>
      </div>
    </div>
  </div>`,
});
Demo.storyName = 'demo';
