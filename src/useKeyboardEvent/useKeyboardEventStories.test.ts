import '@testing-library/jest-dom';
import { waitFor, render } from '@muban/testing-library';
import userEvent from '@testing-library/user-event';
import { Demo } from './useKeyboardEvent.stories';

describe('useKeyboardEvent stories', () => {
  const { keyboard, click, type } = userEvent.setup();

  it('should render', () => {
    const { getByText } = render(Demo);

    expect(getByText('Test Area')).toBeInTheDocument();
  });

  it('should press the `Enter` key', async () => {
    const { getByText } = render(Demo);

    await keyboard('{Enter}');
    await waitFor(() => expect(getByText('pressed the `Enter` key')).toBeInTheDocument());
  });

  it('should press the `ArrowLeft` key', async () => {
    const { getByText, getByRef } = render(Demo);
    const root = getByRef('root');

    // Make sure we have focus on the root, otherwise `ArrowLeft` will throw an error on the testing-library.
    await click(root);
    await keyboard('{ArrowLeft}');
    await waitFor(() =>
      expect(getByText('pressed the `ArrowRight` or `ArrowLeft` key')).toBeInTheDocument(),
    );
  });

  it('should press the `a` key', async () => {
    const { getByText, getByRef } = render(Demo);
    const target = getByRef('input-field');

    await type(target, 'a');
    await waitFor(() => expect(getByText('pressed the `a` key')).toBeInTheDocument());
  });
});
