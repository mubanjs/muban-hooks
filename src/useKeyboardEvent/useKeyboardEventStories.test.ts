import '@testing-library/jest-dom';
import { waitFor, render } from '@muban/testing-library';
import { Key } from 'ts-key-enum';
import { Demo } from './useKeyboardEvent.stories';

describe('useKeyboardEvent stories', () => {
  it('should render', () => {
    const { getByText } = render(Demo);

    expect(getByText('Test Area')).toBeInTheDocument();
  });

  it('should press the `enter` key', async () => {
    const { getByText } = render(Demo);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: Key.Enter }));

    await waitFor(() => expect(getByText('pressed the `Enter` key')).toBeInTheDocument());
  });

  it('should press the `ArrowLeft` key', async () => {
    const { getByText } = render(Demo);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: Key.ArrowLeft }));

    await waitFor(() =>
      expect(getByText('pressed the `ArrowRight` or `ArrowLeft` key')).toBeInTheDocument(),
    );
  });

  it('should press the `a` key', async () => {
    const { getByText, getByRef } = render(Demo);
    const target = getByRef('input-field');

    target.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));

    await waitFor(() => expect(getByText('pressed the `a` key')).toBeInTheDocument());
  });
});
