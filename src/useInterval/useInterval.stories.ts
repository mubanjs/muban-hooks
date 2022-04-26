/* eslint-disable unicorn/prevent-abbreviations,import/no-extraneous-dependencies */
import { bind, computed, defineComponent, propType, reactive, ref } from '@muban/muban';
import type { Story } from '@muban/storybook/types-6-0';
import { html } from '@muban/template';
import { useInterval } from './useInterval';

export default {
  title: 'useInterval',
};

type DemoStoryProps = { startImmediate?: boolean; interval?: number };

export const Demo: Story<DemoStoryProps> = () => ({
  component: defineComponent({
    name: 'story',
    props: {
      startImmediate: propType.boolean.defaultValue(false),
      interval: propType.number,
    },
    refs: {
      label: 'label',
      startButton: 'start-button',
      cancelButton: 'cancel-button',
    },
    setup({ refs, props }) {
      const state = reactive<Array<string>>([]);
      const isIntervalRunning = ref(false);

      function log(message: string) {
        state.push(message);
        setTimeout(() => {
          state.splice(0, 1);
        }, 2000);
      }

      const { startInterval, stopInterval } = useInterval(
        onInterval,
        props.interval,
        props.startImmediate,
      );

      function onInterval() {
        log('interval called');
      }

      return [
        bind(refs.label, {
          html: computed(() =>
            state
              .map((msg) => html`<div class="alert alert-dismissible alert-info">${msg}</div>`)
              .join(''),
          ),
        }),
        bind(refs.startButton, {
          attr: {
            disabled: isIntervalRunning,
          },
          click() {
            isIntervalRunning.value = true;
            startInterval();
          },
        }),
        bind(refs.cancelButton, {
          attr: {
            disabled: computed(() => !isIntervalRunning.value),
          },
          click() {
            isIntervalRunning.value = false;
            log('interval stopped');
            stopInterval();
          },
        }),
      ];
    },
  }),
  template: ({ startImmediate = false, interval = 1000 }: DemoStoryProps = {}) => html` <div
    data-component="story"
    data-start-immediate=${startImmediate}
    data-interval=${interval}
  >
    <div class="alert alert-primary">
      <h4 class="alert-heading">Instructions!</h4>
      <p class="mb-0">
        The demo interval is set to 1 second, you can start it by clicking the start button. You can
        stop the interval by clicking the cancel button.
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
