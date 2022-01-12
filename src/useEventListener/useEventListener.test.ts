import { createMockComponentRef, createMockElementRef, runComponentSetup } from '@muban/test-utils';
import { useEventListener } from './useEventListener';

jest.mock('@muban/muban', () => jest.requireActual('@muban/test-utils').getMubanLifecycleMock());

describe('useEventListener', () => {
  it('should not crash', async () => {
    const target = document.createElement('div');
    const mockHandler = jest.fn();

    await runComponentSetup(() => {
      useEventListener(target, 'click', mockHandler);
    });
  });

  it('should call addEventListener on the target once', async () => {
    const target = document.createElement('div');
    const listenerSpy = jest.spyOn(target, 'addEventListener');

    await runComponentSetup(() => {
      useEventListener(target, 'click', () => undefined);
    });

    expect(listenerSpy).toBeCalledTimes(1);
  });

  it('should call removeEventListener on the target when unmounted', async () => {
    const target = document.createElement('div');
    const listenerSpy = jest.spyOn(target, 'removeEventListener');

    await runComponentSetup(() => {
      useEventListener(target, 'click', () => undefined);
    });

    expect(listenerSpy).toBeCalledTimes(1);
  });

  it('should call the listener when an event is dispatched', async () => {
    const target = document.createElement('div');
    const mockHandler = jest.fn();

    await runComponentSetup(
      () => {
        useEventListener(target, 'click', mockHandler);
      },
      () => {
        target.dispatchEvent(new MouseEvent('click'));
      },
    );

    expect(mockHandler).toBeCalledTimes(1);
  });

  it('should forward the options', async () => {
    const target = document.createElement('div');
    const listenerSpy = jest.spyOn(target, 'addEventListener');
    const mockHandler = jest.fn();

    await runComponentSetup(
      () => {
        useEventListener(target, 'click', mockHandler, { capture: false, passive: false });
      },
      () => {
        target.dispatchEvent(new MouseEvent('click'));
      },
    );

    expect(listenerSpy.mock.calls[0][2]).toEqual({ capture: false, passive: false });
  });

  it('should work with an element Ref', async () => {
    const { ref, target } = createMockElementRef();

    const mockHandler = jest.fn();

    await runComponentSetup(
      () => {
        useEventListener(ref, 'click', mockHandler);
      },
      () => {
        target.dispatchEvent(new MouseEvent('click'));
      },
    );

    expect(mockHandler).toBeCalledTimes(1);
  });

  it('should work with a component Ref', async () => {
    const { ref, target } = createMockComponentRef();

    const mockHandler = jest.fn();

    await runComponentSetup(
      () => {
        useEventListener(ref, 'click', mockHandler);
      },
      () => {
        target.dispatchEvent(new MouseEvent('click'));
      },
    );

    expect(mockHandler).toBeCalledTimes(1);
  });
});
