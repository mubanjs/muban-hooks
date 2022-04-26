import { runComponentSetup } from '@muban/test-utils';
import { timeout } from '../useTimeout/useTimeout.test.utils';
import { useInterval } from './useInterval';

jest.mock('@muban/muban', () => jest.requireActual('@muban/test-utils').getMubanLifecycleMock());

describe('useInterval', () => {
  it('should not crash', async () => {
    await runComponentSetup(() => {
      useInterval(() => undefined);
    });
  });

  it('should start immediate and not be completed', async () => {
    const mockHandler = jest.fn();

    await runComponentSetup(() => {
      useInterval(mockHandler, 100);
    });

    expect(mockHandler).toBeCalledTimes(0);
  });

  it('should start immediate and be called once', async () => {
    const mockHandler = jest.fn();

    await runComponentSetup(
      () => useInterval(mockHandler, 100),
      async ({ stopInterval }) => {
        await timeout(100);
        stopInterval();
      },
    );

    expect(mockHandler).toBeCalledTimes(1);
  });

  it('should trigger start and be stopped after three calls', async () => {
    const mockHandler = jest.fn();

    await runComponentSetup(
      () => useInterval(mockHandler, 100, false),
      async ({ startInterval, stopInterval }) => {
        startInterval();
        await timeout(400);
        stopInterval();
      },
    );

    expect(mockHandler).toBeCalledTimes(3);
  });

  it('should trigger stop once the interval is started', async () => {
    const mockHandler = jest.fn();

    await runComponentSetup(
      () => useInterval(mockHandler, 200, false),
      async ({ startInterval, stopInterval }) => {
        startInterval();
        await timeout(100);
        stopInterval();
      },
    );

    expect(mockHandler).toBeCalledTimes(0);
  });

  it('should start a new interval before the old one was triggered and only complete once', async () => {
    const mockHandler = jest.fn();

    await runComponentSetup(
      () => {
        return useInterval(mockHandler, 100, false);
      },
      async ({ startInterval }) => {
        startInterval();
        await timeout(50);
        startInterval();
        await timeout(100);
      },
    );

    expect(mockHandler).toBeCalledTimes(1);
  });
});
