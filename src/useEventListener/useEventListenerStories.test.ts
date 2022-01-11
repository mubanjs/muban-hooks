import '@testing-library/jest-dom';
import { waitFor, render } from '@muban/testing-library';
import { Demo } from './useEventListener.stories';

describe('useEventListener stories', () => {
  it('should render', () => {
    const { getByText } = render(Demo);

    expect(getByText('Test Area')).toBeInTheDocument();
  });

  it('should click outside', async () => {
    const { getByText } = render(Demo);

    document.body.click();

    await waitFor(() => expect(getByText('clicked the window')).toBeInTheDocument());
  });

  it('should click the story', async () => {
    const { getByText } = render(Demo);

    getByText('Test Area').click();

    await waitFor(() => expect(getByText('clicked the window')).toBeInTheDocument());
    await waitFor(() => expect(getByText('clicked the story')).toBeInTheDocument());
  });

  it('should click the element', async () => {
    const { getByText } = render(Demo);

    getByText('element').click();

    await waitFor(() => expect(getByText('clicked the window')).toBeInTheDocument());
    await waitFor(() => expect(getByText('clicked the story')).toBeInTheDocument());
    await waitFor(() => expect(getByText('clicked the element')).toBeInTheDocument());
  });

  it('should click the component', async () => {
    const { getByText } = render(Demo);

    getByText('component').click();

    await waitFor(() => expect(getByText('clicked the window')).toBeInTheDocument());
    await waitFor(() => expect(getByText('clicked the story')).toBeInTheDocument());
    await waitFor(() => expect(getByText('clicked the component')).toBeInTheDocument());
  });
});
