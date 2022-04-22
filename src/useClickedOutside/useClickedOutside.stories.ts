/* eslint-disable import/no-extraneous-dependencies */

import { defineComponent } from '@muban/muban';
import type { Story } from '@muban/storybook/types-6-0';
import { html } from '@muban/template';
import { useClickedOutside } from './useClickedOutside';
import { useStorybookLog } from '../hooks/useStorybookLog';

export default {
  title: 'useClickedOutside',
};

export const Demo: Story = () => ({
  component: defineComponent({
    name: 'story',
    refs: {
      testArea: 'test-area',
      label: 'label',
    },
    setup({ refs }) {
      const [log, logBinding] = useStorybookLog(refs.label);

      useClickedOutside(refs.testArea, () => {
        log('clicked outside the test area');
      });

      return [logBinding];
    },
  }),
  template: () => html`<div data-component="story" data-initial-value="true">
    <div class="alert alert-primary">
      <h4 class="alert-heading">Instructions!</h4>
      <p class="mb-0">Click outside the <code>"Test Area"</code> to see events being triggered</p>
    </div>
    <div data-ref="label" />
    <div class="card border-dark" data-ref="test-area">
      <div class="card-header">Test Area</div>
      <div class="card-body">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusamus amet animi aperiam
          atque blanditiis, distinctio dolore earum eius fugiat fugit magnam, nam nemo numquam
          obcaecati quae repellendus vero voluptas.
        </p>
      </div>
    </div>
  </div>`,
});
Demo.storyName = 'demo';
