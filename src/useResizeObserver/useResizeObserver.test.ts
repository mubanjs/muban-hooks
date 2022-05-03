import { createMockElementRef, runComponentSetup } from '@muban/test-utils';
import { mockResizeObserver } from 'jsdom-testing-mocks';
import { useResizeObserver } from './useResizeObserver';
import { timeout } from './useResizeObserver.test.utils';

jest.mock('@muban/muban', () => jest.requireActual('@muban/test-utils').getMubanLifecycleMock());

const resizeObserver = mockResizeObserver();

describe('useResizeObserver', () => {
  it('should not crash', () => {
    const { ref } = createMockElementRef();

    runComponentSetup(() => {
      useResizeObserver(ref, () => undefined);
    });
  });

  it('should attach a resize observer to a ref', async () => {
    const mockHandler = jest.fn();
    const { ref, target } = createMockElementRef();

    await runComponentSetup(
      () => {
        useResizeObserver(ref, mockHandler);
      },
      async () => {
        resizeObserver.resize(target);
        await timeout(0);
      },
    );

    expect(mockHandler).toBeCalledTimes(1);
  });

  it('should attach a resize observer to a HTML element', async () => {
    const mockHandler = jest.fn();
    const { target } = createMockElementRef();

    await runComponentSetup(
      () => {
        useResizeObserver(target, mockHandler);
      },
      async () => {
        resizeObserver.resize(target);
        await timeout(0);
      },
    );

    expect(mockHandler).toBeCalledTimes(1);
  });
});
