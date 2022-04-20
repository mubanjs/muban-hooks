import { reactive } from '@muban/muban';

/**
 * This hook can be used to keep track of logs within Storybook
 *
 * @returns
 */
export function useStorybookLog(): { state: Array<string>; log: (message: string) => void } {
  const state = reactive<Array<string>>([]);

  function log(message: string): void {
    state.push(message);
    setTimeout(() => {
      state.splice(0, 1);
    }, 2000);
  }

  return { state, log };
}
