/* eslint-disable unicorn/prevent-abbreviations,import/no-extraneous-dependencies */
import { bind, computed, defineComponent, reactive } from '@muban/muban';
import type { Story } from '@muban/storybook/types-6-0';
import { html } from '@muban/template';
import { useEscapeKeyEvent } from './useEscapeKeyEvent';

export default {
  title: 'useEscapeKeyEvent',
};

export const Demo: Story = () => ({
  component: defineComponent({
    name: 'story',
    refs: {
      label: 'label',
    },
    setup({ refs }) {
      const state = reactive<Array<string>>([]);

      const log = (message: string) => {
        state.push(message);
        setTimeout(() => {
          state.splice(0, 1);
        }, 2000);
      };

      useEscapeKeyEvent(() => {
        log('pressed the `Escape` key');
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
  template: () => html` <div data-component="story">
    <div class="alert alert-primary">
      <h4 class="alert-heading">Instructions!</h4>
      <p class="mb-0">Press the <code>Escape</code> key to see the event being triggered</p>
    </div>
    <div data-ref="label" />
  </div>`,
});
Demo.storyName = 'demo';
