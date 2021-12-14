import { isRef, ref, Ref, unref, watchEffect } from '@muban/muban';

/**
 * Easily toggle value between two states
 * @param initialValue Whether the toggle should be initially true or false
 *
 * @example
 * ```
 * const [isActive, toggle] = useToggle(false);
 * watchEffect(() => {
 *   console.log('active', isActive);
 * }
 * toggle();
 * toggle(false);
 * toggle(true);
 * ```
 */
export function useToggle(
  initialValue: Ref<boolean> | boolean,
): readonly [Ref<boolean>, (force?: boolean) => void] {
  const state = ref(unref(initialValue));

  if (isRef(initialValue)) {
    watchEffect(() => {
      if (initialValue.value !== undefined) {
        state.value = initialValue.value;
      }
    });
  }
  const toggle = (force?: boolean) => {
    state.value = force === undefined ? !state.value : force;
  };
  // TODO: should `state` be returned as readOnly?
  //  there is not really a need for it
  return [state, toggle] as const;
}
