import '@testing-library/jest-dom';
import { waitFor, render } from '@muban/testing-library';
import { Demo } from './useTimeout.stories';
import { timeout } from './useTimeout.test.utils';

describe('useTimeout stories', () => {
  it('should render', () => {
    const { getByText } = render(Demo);

    expect(getByText('Test Area')).toBeInTheDocument();
  });

  it('should start immediate and be completed after 1ms', async () => {
    const { getByText } = render(Demo, { startImmediate: true, duration: 1 });

    await waitFor(() => expect(getByText('timeout complete')).toBeInTheDocument());
  });

  it('should start after clicking start and be completed after 1ms', async () => {
    const { getByText, getByRef } = render(Demo, { duration: 1 });
    const startButton = getByRef('start-button');

    startButton.click();

    await waitFor(() => expect(getByText('timeout complete')).toBeInTheDocument());
  });

  it('should cancel the timeout after starting', async () => {
    const { getByText, getByRef } = render(Demo, { duration: 100 });
    const startButton = getByRef('start-button');
    const cancelButton = getByRef('cancel-button');

    startButton.click();
    await timeout(1);
    cancelButton.click();

    await waitFor(() => expect(getByText('canceled timeout')).toBeInTheDocument());
  });
});
