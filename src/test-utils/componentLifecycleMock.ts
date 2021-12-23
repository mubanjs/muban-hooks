/* eslint-disable no-console */

/**
 * A simple implementation of a component with only the lifecycle hooks
 * An "instance" of this will be assigned to `currentComponentInstance`, used to target this
 * instance when registering hooks
 */
function createFakeComponent() {
  return {
    listeners: {
      mount: [] as Array<() => void>,
      unmount: [] as Array<() => void>,
    },
    register(type: 'mount' | 'unmount', callback: () => void) {
      this.listeners[type].push(callback);
    },
    mount() {
      this.listeners.mount.forEach((callback) => callback());
    },
    unMount() {
      this.listeners.unmount.forEach((callback) => callback());
    },
  };
}
let currentComponentInstance: ReturnType<typeof createFakeComponent> | undefined;

/**
 * Mock `onMounted` and `onUnmounted` for imports to `@muban/muban`.
 * It uses the active `currentComponentInstance` to register these lifecycle hooks
 */
export function getMubanLifecycleMock() {
  return {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    __esModule: true,
    onMounted: (callback: () => void) => {
      if (!currentComponentInstance) {
        console.error('Please test your component inside ...');
        return;
      }
      currentComponentInstance.register('mount', callback);
    },
    onUnmounted: (callback: () => void) => {
      if (!currentComponentInstance) {
        console.error('Please test your component inside ...');
        return;
      }
      currentComponentInstance.register('unmount', callback);
    },
  };
}

/**
 * A helper function that "fakes" how a component would run its setup and lifecycle methods.
 * It makes sure that the lifecycle hooks called during the `setupFunction` are bound to the
 * `currentComponentInstance`, so those hooks can be triggered.
 *
 * @param setupFunction A function to init your hooks. It runs before any lifecycle hooks are
 * called, similar to the actual component `setup` function.
 * @param runFunction A function that would simulate anything that would happen during a component's
 * lifetime. Basically the user/dom that interacts with a component (e.g. clicking on it).
 * This function can be async if you need this for your test case.
 *
 * @return Promise Since the `runFunction` can be async, this whole function is async by default.
 * It's best to `await` this, and do you assertions after.
 */
export async function runComponentSetup(
  setupFunction: () => void,
  runFunction?: () => void | Promise<void>,
): Promise<void> {
  currentComponentInstance = createFakeComponent();
  setupFunction();
  currentComponentInstance.mount();
  await runFunction?.();
  currentComponentInstance.unMount();
  currentComponentInstance = undefined;
}
