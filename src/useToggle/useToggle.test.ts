import { useToggle } from './useToggle';

describe('useToggle', () => {
  test('The initial state', () => {
    const [state1] = useToggle(true);
    const [state2] = useToggle(false);
    expect(state1.value).toEqual(true);
    expect(state2.value).toEqual(false);
  });

  test('The toggle should switch the value', () => {
    const [state, toggle] = useToggle(false);
    expect(state.value).toEqual(false);

    toggle();
    expect(state.value).toEqual(true);

    toggle();
    expect(state.value).toEqual(false);
  });

  test('The toggle should set the value', () => {
    const [state, toggle] = useToggle(false);
    expect(state.value).toEqual(false);

    toggle(false);
    expect(state.value).toEqual(false);

    toggle(true);
    expect(state.value).toEqual(true);

    toggle(true);
    expect(state.value).toEqual(true);
  });
});
