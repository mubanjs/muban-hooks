import { runComponentSetup } from '@muban/test-utils';
import { useTimeout } from './useTimeout';
import { timeout } from './useTimeout.test.utils';

jest.mock('@muban/muban', () => jest.requireActual('@muban/test-utils').getMubanLifecycleMock());

describe('useTimeout', () => {
  it('should not crash', async () => {
    await runComponentSetup(() => {
      useTimeout(() => undefined);
    });
  });

  it('should start immediate and be completed after 1ms', async () => {
    const mockHandler = jest.fn();

    await runComponentSetup(
      () => {
        useTimeout(mockHandler, 100);
      },
      () => timeout(200),
    );

    expect(mockHandler).toBeCalledTimes(1);
  });

  it('should start immediate and not be completed', async () => {
    const mockHandler = jest.fn();

    await runComponentSetup(() => {
      useTimeout(mockHandler, 100);
    });

    expect(mockHandler).toBeCalledTimes(0);
  });

  it('should trigger start and be completed after 1ms', async () => {
    const mockHandler = jest.fn();

    await runComponentSetup(
      () => useTimeout(mockHandler, 100, false),
      async ({ startTimeout }) => {
        startTimeout();
        await timeout(200);
      },
    );

    expect(mockHandler).toBeCalledTimes(1);
  });

  it('should trigger cancel once the timeout is started', async () => {
    const mockHandler = jest.fn();

    await runComponentSetup(
      () => useTimeout(mockHandler, 500, false),
      async ({ startTimeout, cancelTimeout }) => {
        startTimeout();
        await timeout(100);
        cancelTimeout();
      },
    );

    expect(mockHandler).toBeCalledTimes(0);
  });

  it('should start a new timeout before the old one running out and only complete once', async () => {
    const mockHandler = jest.fn();

    await runComponentSetup(
      () => useTimeout(mockHandler, 200, false),
      async ({ startTimeout }) => {
        startTimeout();
        await timeout(100);
        startTimeout();
        await timeout(300);
      },
    );

    expect(mockHandler).toBeCalledTimes(1);
  });
});
