import { runComponentSetup } from '@muban/test-utils';
import { useInterval } from './useInterval';

jest.mock('@muban/muban', () => jest.requireActual('@muban/test-utils').getMubanLifecycleMock());

describe('useInterval', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('should not crash', () => {
    runComponentSetup(() => {
      useInterval(() => undefined);
    });
  });

  it('should start immediate and not be completed', () => {
    const mockHandler = jest.fn();

    runComponentSetup(() => {
      useInterval(mockHandler, 100);
    });

    expect(mockHandler).toBeCalledTimes(0);
  });

  it('should start immediate and be called once', () => {
    const mockHandler = jest.fn();

    runComponentSetup(
      () => useInterval(mockHandler, 100),
      ({ stopInterval }) => {
        jest.advanceTimersByTime(100);
        stopInterval();
      },
    );

    expect(mockHandler).toBeCalledTimes(1);
  });

  it('should trigger start and be stopped after three calls', () => {
    const mockHandler = jest.fn();

    runComponentSetup(
      () => useInterval(mockHandler, 100, false),
      ({ startInterval, stopInterval }) => {
        startInterval();
        jest.advanceTimersByTime(300);
        stopInterval();
      },
    );

    expect(mockHandler).toBeCalledTimes(3);
  });

  it('should trigger stop once the interval is started', () => {
    const mockHandler = jest.fn();

    runComponentSetup(
      () => useInterval(mockHandler, 200, false),
      ({ startInterval, stopInterval }) => {
        startInterval();
        jest.advanceTimersByTime(100);
        stopInterval();
      },
    );

    expect(mockHandler).toBeCalledTimes(0);
  });

  it('should know that the interval is running', () => {
    const mockHandler = jest.fn();

    runComponentSetup(
      () => useInterval(mockHandler, 200, false),
      ({ startInterval, stopInterval, isIntervalRunning }) => {
        startInterval();
        jest.advanceTimersByTime(100);
        expect(isIntervalRunning.value).toEqual(true);
        stopInterval();
        expect(isIntervalRunning.value).toEqual(false);
      },
    );
  });

  it('should start a new interval before the old one was triggered and only complete once', () => {
    const mockHandler = jest.fn();

    runComponentSetup(
      () => useInterval(mockHandler, 100, false),
      ({ startInterval }) => {
        startInterval();
        jest.advanceTimersByTime(50);
        startInterval();
        jest.advanceTimersByTime(100);
      },
    );

    expect(mockHandler).toBeCalledTimes(1);
  });
});
