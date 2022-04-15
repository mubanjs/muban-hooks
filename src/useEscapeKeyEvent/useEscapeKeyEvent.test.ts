import { createMockComponentRef, createMockElementRef, runComponentSetup } from '@muban/test-utils';
import { useEscapeKeyEvent } from './useEscapeKeyEvent';

jest.mock('@muban/muban', () => jest.requireActual('@muban/test-utils').getMubanLifecycleMock());

describe('useEscapeKeyEvent', () => {
  it('should not crash', async () => {
    const mockHandler = jest.fn();

    await runComponentSetup(() => {
      useEscapeKeyEvent(mockHandler);
    });
  });
});
