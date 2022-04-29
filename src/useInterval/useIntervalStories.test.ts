import '@testing-library/jest-dom';
import { waitFor, render } from '@muban/testing-library';
import userEvent from '@testing-library/user-event';
import { Demo } from './useInterval.stories';

describe('useInterval stories', () => {
  const { click } = userEvent.setup();

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

    click(startButton);

    await waitFor(() => expect(getByText('interval called')).toBeInTheDocument());
  });
});
