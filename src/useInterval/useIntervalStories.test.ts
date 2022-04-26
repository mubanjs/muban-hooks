import '@testing-library/jest-dom';
import { waitFor, render } from '@muban/testing-library';
import { Demo } from './useInterval.stories';
import { timeout } from '../useTimeout/useTimeout.test.utils';

describe('useInterval stories', () => {
  it('should render', () => {
    const { getByText } = render(Demo);

    expect(getByText('Test Area')).toBeInTheDocument();
  });

  it('should start immediate and be called after 100ms', async () => {
    const { getByText } = render(Demo, { startImmediate: true, interval: 100 });

    await waitFor(() => expect(getByText('interval called')).toBeInTheDocument());
  });

  it('should start after clicking start and be called after 100ms', async () => {
    const { getByText, getByRef } = render(Demo, { interval: 100 });
    const startButton = getByRef('start-button');

    startButton.click();

    await waitFor(() => expect(getByText('interval called')).toBeInTheDocument());
  });

  it('should stop the interval after starting', async () => {
    const { getByText, getByRef } = render(Demo, { interval: 100 });
    const startButton = getByRef('start-button');
    const stopButton = getByRef('stop-button');

    startButton.click();
    await timeout(100);
    stopButton.click();

    await waitFor(() => expect(getByText('interval stopped')).toBeInTheDocument());
  });
});
