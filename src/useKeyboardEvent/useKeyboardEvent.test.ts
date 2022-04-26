import { createMockComponentRef, createMockElementRef, runComponentSetup } from '@muban/test-utils';
import { useKeyboardEvent } from './useKeyboardEvent';

jest.mock('@muban/muban', () => jest.requireActual('@muban/test-utils').getMubanLifecycleMock());

describe('useKeyboardEvent', () => {
  it('should not crash', async () => {
    const mockHandler = jest.fn();

    await runComponentSetup(() => {
      useKeyboardEvent('ArrowRight', mockHandler);
    });
  });

  it('should call addEventListener on the target once', async () => {
    const listenerSpy = jest.spyOn(document, 'addEventListener');

    await runComponentSetup(() => {
      useKeyboardEvent('ArrowRight', () => undefined);
    });

    expect(listenerSpy).toBeCalledTimes(1);

    listenerSpy.mockRestore();
  });

  it('should call removeEventListener on the target when unmounted', async () => {
    const listenerSpy = jest.spyOn(document, 'removeEventListener');

    await runComponentSetup(() => {
      useKeyboardEvent('ArrowRight', () => undefined);
    });

    expect(listenerSpy).toBeCalledTimes(1);

    listenerSpy.mockRestore();
  });

  it('should call the listener when the `ArrowRight` key is pressed', async () => {
    const mockHandler = jest.fn();

    await runComponentSetup(
      () => {
        useKeyboardEvent('ArrowRight', mockHandler);
      },
      () => {
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
      },
    );

    expect(mockHandler).toBeCalledTimes(1);
  });
  it('should call the listener when the `a` or `b` key is pressed', async () => {
    const mockHandler = jest.fn();

    await runComponentSetup(
      () => {
        useKeyboardEvent(['a', 'b'], mockHandler);
      },
      () => {
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'b' }));
      },
    );

    expect(mockHandler).toBeCalledTimes(2);
  });
  it('should work with an element Ref', async () => {
    const { ref, target } = createMockElementRef();

    const mockHandler = jest.fn();

    await runComponentSetup(
      () => {
        useKeyboardEvent('ArrowRight', mockHandler, ref);
      },
      () => {
        target.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
      },
    );

    expect(mockHandler).toBeCalledTimes(1);
  });

  it('should work with a component Ref', async () => {
    const { ref, target } = createMockComponentRef();

    const mockHandler = jest.fn();

    await runComponentSetup(
      () => {
        useKeyboardEvent('ArrowRight', mockHandler, ref);
      },
      () => {
        target.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
      },
    );

    expect(mockHandler).toBeCalledTimes(1);
  });
});
