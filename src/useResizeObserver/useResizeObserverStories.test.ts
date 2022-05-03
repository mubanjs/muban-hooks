import '@testing-library/jest-dom';
import { render, waitFor } from '@muban/testing-library';
import { mockResizeObserver } from 'jsdom-testing-mocks';
import { Demo } from './useResizeObserver.stories';

const resizeObserver = mockResizeObserver();

describe('useResizeObserver stories', () => {
  it('should render', () => {
    const { getByText } = render(Demo);

    expect(getByText('Test Area')).toBeInTheDocument();
  });

  it('should trigger a resize', async () => {
    const { getByRef, getByText } = render(Demo);
    const target = getByRef('test-area');

    resizeObserver.resize(target);

    await waitFor(() => expect(getByText('resize observer triggered')).toBeInTheDocument());
  });
});
