/* eslint-disable unicorn/prevent-abbreviations,import/no-extraneous-dependencies */
import { bind, computed, defineComponent, reactive } from '@muban/muban';
import type { Story } from '@muban/storybook/types-6-0';
import { html } from '@muban/template';
import { useKeyboardEvent } from './useKeyboardEvent';

export default {
  title: 'useKeyboardEvent',
};

export const Demo: Story = () => ({
  component: defineComponent({
    name: 'story',
    refs: {
      label: 'label',
      inputField: 'input-field',
    },
    setup({ refs }) {
      const state = reactive<Array<string>>([]);

      const log = (message: string) => {
        state.push(message);
        setTimeout(() => {
          state.splice(0, 1);
        }, 2000);
      };

      useKeyboardEvent('Enter', () => {
        log('pressed the `Enter` key');
      });
      useKeyboardEvent(['ArrowLeft', 'ArrowRight'], () => {
        log('pressed the `ArrowRight` or `ArrowLeft` key');
      });
      useKeyboardEvent(
        'a',
        () => {
          log('pressed the `a` key');
        },
        refs.inputField,
      );

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
  template: () => html` <div data-component="story" data-ref="root">
    <div class="alert alert-primary">
      <h4 class="alert-heading">Instructions!</h4>
      <p class="mb-2">Press any of the following keys to see events being triggered</p>
      <ul>
        <li><code>Enter</code></li>
        <li><code>ArrowLeft</code></li>
        <li><code>ArrowRight</code></li>
      </ul>
      <p class="mb-2">The following keys only trigger an event when focussed on the input field.</p>
      <ul>
        <li><code>a</code></li>
      </ul>
    </div>
    <div data-ref="label" />
    <div class="card border-dark">
      <div class="card-header">Test Area</div>
      <div class="card-body">
        <input
          type="text"
          class="form-control"
          data-ref="input-field"
          placeholder="Focus here and type away."
        />
      </div>
    </div>
  </div>`,
});
Demo.storyName = 'demo';
