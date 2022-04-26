/* eslint-disable import/no-extraneous-dependencies */
import type { ComponentRef, ElementRef, ComponentFactory } from '@muban/muban';
import { html } from '@muban/template';
import { bind, computed, reactive } from '@muban/muban';
import type { Binding } from '@muban/muban/types/lib/bindings/bindings.types';

/**
 * This hook can be used to keep track of logs within Storybook
 *
 * @param logRef The Ref that will hold the logs.
 */
export function useStorybookLog(
  logRef: ElementRef | ComponentRef<ComponentFactory>,
): readonly [Binding, (message: string) => void] {
  const logs = reactive<Array<string>>([]);

  function log(message: string): void {
    logs.push(message);
    setTimeout(() => {
      logs.splice(0, 1);
    }, 2000);
  }

  return [
    bind(logRef, {
      html: computed(() =>
        logs
          .map((value) => html` <div class="alert alert-dismissible alert-info">${value}</div>`)
          .join(''),
      ),
    }),
    log,
  ];
}
