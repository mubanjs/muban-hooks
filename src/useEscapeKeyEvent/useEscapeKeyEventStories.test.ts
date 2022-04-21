import '@testing-library/jest-dom';
import { waitFor, render } from '@muban/testing-library';
import { Key } from 'ts-key-enum';
import { Demo } from './useEscapeKeyEvent.stories';

describe('useEscapeKeyEvent stories', () => {
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
