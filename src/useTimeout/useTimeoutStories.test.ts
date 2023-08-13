import '@testing-library/jest-dom';
import { waitFor, render } from '@muban/testing-library';
import userEvent from '@testing-library/user-event';
import { Demo } from './useTimeout.stories';

describe('useTimeout stories', () => {
  const { click } = userEvent.setup();

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

    click(startButton);

    await waitFor(() => expect(getByText('timeout complete')).toBeInTheDocument());
  });
});
