import { useToggle } from './useToggle';

describe('useToggle', () => {
  it('should not crash', () => {
    useToggle(true);
  });

  it('should have correct initial state', () => {
    const [state1] = useToggle(true);
    const [state2] = useToggle(false);
    expect(state1.value).toEqual(true);
    expect(state2.value).toEqual(false);
  });

  it('should switch the value when calling toggle', () => {
    const [state, toggle] = useToggle(false);
    expect(state.value).toEqual(false);

    toggle();
    expect(state.value).toEqual(true);

    toggle();
    expect(state.value).toEqual(false);
  });

  it('should set the value explicitly', () => {
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
