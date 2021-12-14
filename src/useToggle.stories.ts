/* eslint-disable unicorn/prevent-abbreviations,import/no-extraneous-dependencies */
// import UseToggleDocs from './useToggle.docs.mdx';

import { bind, defineComponent, propType } from '@muban/muban';
import { html } from '@muban/template';
import { useToggle } from './useToggle';

export default {
  title: 'useToggle',
};

export const Story = () => ({
  component: defineComponent({
    name: 'use-toggle',
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
  template: () => html`<div data-component="use-toggle" data-initial-value="true">
    <div>Value: <span data-ref="label" class="badge rounded-pill bg-primary"></span></div>
    <div style="margin-top: 20px">
      <button type="button" data-ref="btnToggle" class="btn btn-primary">Toggle</button>${' '}
      <button type="button" data-ref="btnEnable" class="btn btn-success">Enable</button>${' '}
      <button type="button" data-ref="btnDisable" class="btn btn-danger">Disable</button>
    </div>
  </div>`,
});
