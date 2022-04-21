import '@testing-library/jest-dom';
import { waitFor, render } from '@muban/testing-library';
import userEvent from '@testing-library/user-event';
import { Demo } from './useEscapeKeyEvent.stories';

describe('useEscapeKeyEvent stories', () => {
  const { keyboard } = userEvent.setup();

  it('should render', () => {
    const { getByText } = render(Demo);

    expect(getByText('Instructions!')).toBeInTheDocument();
  });

  it('should press the `Escape` key', async () => {
    const { getByText } = render(Demo);

    await keyboard('{Escape}');
    await waitFor(() => expect(getByText('pressed the `Escape` key')).toBeInTheDocument());
  });
});
