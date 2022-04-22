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
        useTimeout(mockHandler, 1);
      },
      () => timeout(2),
    );

    expect(mockHandler).toBeCalledTimes(1);
  });

  it('should start immediate and not be completed', async () => {
    const mockHandler = jest.fn();

    await runComponentSetup(() => {
      useTimeout(mockHandler, 1);
    });

    expect(mockHandler).toBeCalledTimes(0);
  });

  it('should trigger start and be completed after 1ms', async () => {
    const mockHandler = jest.fn();

    await runComponentSetup(
      () => {
        const { startTimeout } = useTimeout(mockHandler, 1, false);

        startTimeout();
      },
      () => timeout(2),
    );

    expect(mockHandler).toBeCalledTimes(1);
  });

  it('should trigger cancel once the timeout is started', async () => {
    const mockHandler = jest.fn();

    await runComponentSetup(
      async () => {
        const { startTimeout, cancelTimeout } = useTimeout(mockHandler, 2, false);

        startTimeout();
        await timeout(1);
        cancelTimeout();
      },
      () => timeout(3),
    );

    expect(mockHandler).toBeCalledTimes(0);
  });

  it('should start a new timeout before the old one running out and only complete once', async () => {
    const mockHandler = jest.fn();

    await runComponentSetup(
      async () => {
        const { startTimeout } = useTimeout(mockHandler, 2, false);

        startTimeout();
        await timeout(1);
        startTimeout();
      },
      () => timeout(5),
    );

    expect(mockHandler).toBeCalledTimes(1);
  });
});
