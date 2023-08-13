/* eslint-disable import/no-extraneous-dependencies */
import { bind, computed, defineComponent, propType } from '@muban/muban';
import type { Story } from '@muban/storybook/types-6-0';
import { html } from '@muban/template';
import { useInterval } from './useInterval';
import { useStorybookLog } from '../hooks/useStorybookLog';

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
      stopButton: 'stop-button',
    },
    setup({ refs, props }) {
      const [logBinding, log] = useStorybookLog(refs.label);

      function onInterval() {
        log('interval called');
      }

      const { startInterval, stopInterval, isIntervalRunning } = useInterval(
        onInterval,
        props.interval,
        props.startImmediate,
      );

      return [
        logBinding,
        bind(refs.startButton, {
          attr: {
            disabled: isIntervalRunning,
          },
          click() {
            startInterval();
          },
        }),
        bind(refs.stopButton, {
          attr: {
            disabled: computed(() => !isIntervalRunning.value),
          },
          click() {
            log('interval stopped');
            stopInterval();
          },
        }),
      ];
    },
  }),
  template: ({ startImmediate = false, interval = 2500 }: DemoStoryProps = {}) => html`<div
    data-component="story"
    data-start-immediate=${startImmediate}
    data-interval=${interval}
  >
    <div class="alert alert-primary">
      <h4 class="alert-heading">Instructions!</h4>
      <p class="mb-0">
        The demo interval is set to 2.5 seconds, you can start it by clicking the start button. You
        can stop the interval by clicking the stop button.
      </p>
    </div>
    <div data-ref="label" />
    <div class="card border-dark">
      <div class="card-header">Test Area</div>
      <div class="card-body">
        <button type="button" data-ref="start-button" class="btn btn-primary">
          Start interval
        </button>
        ${' '}
        <button type="button" data-ref="stop-button" class="btn btn-danger">Stop interval</button>
      </div>
    </div>
  </div>`,
});
Demo.storyName = 'demo';
