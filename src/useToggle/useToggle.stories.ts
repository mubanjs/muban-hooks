/* eslint-disable unicorn/prevent-abbreviations,import/no-extraneous-dependencies */
// import UseToggleDocs from './useToggle.docs.mdx';

import { bind, defineComponent, propType } from '@muban/muban';
import type { Story } from '@muban/storybook/dist/client/preview/types-6-0';
import { html } from '@muban/template';
import { useToggle } from './useToggle';

export default {
  title: 'useToggle',
};

export const Demo: Story = () => ({
  component: defineComponent({
    name: 'story',
    props: {
      initialValue: propType.boolean,
    },
    refs: {
      label: 'label',
      btnToggle: 'btnToggle',
      btnEnable: 'btnEnable',
      btnDisable: 'btnDisable',
    },
    setup({ props, refs }) {
      const [state, toggle] = useToggle(props.initialValue);
      return [
        bind(refs.label, { text: state }),
        bind(refs.btnToggle, {
          click() {
            toggle();
          },
        }),
        bind(refs.btnEnable, {
          click() {
            toggle(true);
          },
        }),
        bind(refs.btnDisable, {
          click() {
            toggle(false);
          },
        }),
      ];
    },
  }),
  template: () => html`<div data-component="story" data-initial-value="true">
    <div class="alert alert-primary">
      <h4 class="alert-heading">Instructions!</h4>
      <p class="mb-0">When clicking the buttons, the value should update accordingly.</p>
    </div>
    <div>Value: <span data-ref="label" class="badge rounded-pill bg-primary"></span></div>
    <div style="margin-top: 20px">
      <button type="button" data-ref="btnToggle" class="btn btn-primary">Toggle</button>${' '}
      <button type="button" data-ref="btnEnable" class="btn btn-success">Enable</button>${' '}
      <button type="button" data-ref="btnDisable" class="btn btn-danger">Disable</button>
    </div>
  </div>`,
});
Demo.storyName = 'demo';
