import { runComponentSetup } from '@muban/test-utils';
import { useTimeout } from './useTimeout';

jest.mock('@muban/muban', () => jest.requireActual('@muban/test-utils').getMubanLifecycleMock());

describe('useTimeout', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('should not crash', () => {
    runComponentSetup(() => {
      useTimeout(() => undefined);
    });
  });

  it('should start immediate and be completed after 1ms', () => {
    const mockHandler = jest.fn();

    runComponentSetup(() => {
      useTimeout(mockHandler, 100);
    });

    jest.advanceTimersByTime(200);
    expect(mockHandler).toBeCalledTimes(1);
  });

  it('should start immediate and not be completed', () => {
    const mockHandler = jest.fn();

    runComponentSetup(() => {
      useTimeout(mockHandler, 100);
    });

    expect(mockHandler).toBeCalledTimes(0);
  });

  it('should trigger start and be completed after 1ms', () => {
    const mockHandler = jest.fn();

    runComponentSetup(
      () => useTimeout(mockHandler, 100, false),
      ({ startTimeout }) => {
        startTimeout();
      },
    );
    jest.advanceTimersByTime(200);
    expect(mockHandler).toBeCalledTimes(1);
  });

  it('should trigger cancel once the timeout is started', () => {
    const mockHandler = jest.fn();

    runComponentSetup(
      () => useTimeout(mockHandler, 500, false),
      ({ startTimeout, cancelTimeout }) => {
        startTimeout();
        jest.advanceTimersByTime(100);
        cancelTimeout();
      },
    );

    expect(mockHandler).toBeCalledTimes(0);
  });

  it('should start a new timeout before the old one running out and only complete once', () => {
    const mockHandler = jest.fn();

    runComponentSetup(
      () => useTimeout(mockHandler, 200, false),
      ({ startTimeout }) => {
        startTimeout();
        jest.advanceTimersByTime(100);
        startTimeout();
        jest.advanceTimersByTime(300);
      },
    );

    expect(mockHandler).toBeCalledTimes(1);
  });
});
