import { createMockComponentRef, createMockElementRef, runComponentSetup } from '@muban/test-utils';
import { useClickedOutside } from './useClickedOutside';

jest.mock('@muban/muban', () => jest.requireActual('@muban/test-utils').getMubanLifecycleMock());

describe('useEventListener', () => {
  it('should not crash', async () => {
    const target = document.createElement('div');
    const mockHandler = jest.fn();

    await runComponentSetup(() => {
      useClickedOutside(target, mockHandler);
    });
  });

  it('should call addEventListener on the target once', async () => {
    const target = document.createElement('div');
    const listenerSpy = jest.spyOn(document, 'addEventListener');

    await runComponentSetup(() => {
      useClickedOutside(target, () => undefined);
    });

    expect(listenerSpy).toBeCalledTimes(1);

    listenerSpy.mockRestore();
  });

  it('should call removeEventListener on the target when unmounted', async () => {
    const target = document.createElement('div');
    const listenerSpy = jest.spyOn(document, 'removeEventListener');

    await runComponentSetup(() => {
      useClickedOutside(target, () => undefined);
    });

    expect(listenerSpy).toBeCalledTimes(1);

    listenerSpy.mockRestore();
  });

  it('should not the listener when clicked on the target', async () => {
    const target = document.createElement('div');
    const mockHandler = jest.fn();

    await runComponentSetup(
      () => {
        useClickedOutside(target, mockHandler);
      },
      () => {
        target.dispatchEvent(new MouseEvent('click'));
      },
    );

    expect(mockHandler).toBeCalledTimes(0);
  });

  it('should call the listener when clicked clicked on the body', async () => {
    const target = document.createElement('div');
    const mockHandler = jest.fn();

    await runComponentSetup(
      () => {
        useClickedOutside(target, mockHandler);
      },
      () => {
        document.dispatchEvent(new MouseEvent('click'));
      },
    );

    expect(mockHandler).toBeCalledTimes(1);
  });

  it('should forward the options', async () => {
    const target = document.createElement('div');
    const listenerSpy = jest.spyOn(document, 'addEventListener');
    const mockHandler = jest.fn();

    await runComponentSetup(
      () => {
        useClickedOutside(target, mockHandler, { capture: false, passive: false });
      },
      () => {
        document.dispatchEvent(new MouseEvent('click'));
      },
    );

    expect(listenerSpy.mock.calls[0][2]).toEqual({ capture: false, passive: false });

    listenerSpy.mockRestore();
  });

  it('should work with an element Ref', async () => {
    const { ref } = createMockElementRef();

    const mockHandler = jest.fn();

    await runComponentSetup(
      () => {
        useClickedOutside(ref, mockHandler);
      },
      () => {
        document.dispatchEvent(new MouseEvent('click'));
      },
    );

    expect(mockHandler).toBeCalledTimes(1);
  });

  it('should work with a component Ref', async () => {
    const { ref } = createMockComponentRef();

    const mockHandler = jest.fn();

    await runComponentSetup(
      () => {
        useClickedOutside(ref, mockHandler);
      },
      () => {
        document.dispatchEvent(new MouseEvent('click'));
      },
    );

    expect(mockHandler).toBeCalledTimes(1);
  });
});
