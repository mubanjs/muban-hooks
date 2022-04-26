import '@testing-library/jest-dom';
import { waitFor, render } from '@muban/testing-library';
import { Demo } from './useClickedOutside.stories';

describe('useClickedOutside stories', () => {
  it('should render', () => {
    const { getByText } = render(Demo);

    expect(getByText('Test Area')).toBeInTheDocument();
  });

  it('should click outside', async () => {
    const { getByText } = render(Demo);

    document.body.click();

    await waitFor(() => expect(getByText('clicked outside the test area')).toBeInTheDocument());
  });
});
