import '@testing-library/jest-dom';
import { waitFor } from '@testing-library/dom';
import { render } from '../testing-library/render';
import { Demo } from './useToggle.stories';

describe('useToggle stories', () => {
  it('should render', () => {
    const { getByRef } = render(Demo);

    const label = getByRef('label');

    expect(label).toHaveTextContent(/^false$/i);
  });

  it('should render have initial value false', () => {
    const { getByRef } = render(Demo, { initialValue: true });

    const label = getByRef('label');

    expect(label).toHaveTextContent(/^true$/i);
  });

  it('should enable', async () => {
    const { getByRef, getByText } = render(Demo);

    const label = getByRef('label');
    expect(label).toHaveTextContent(/^false$/i);

    const enableButton = getByText('Enable');
    enableButton.click();
    await waitFor(() => expect(label).toHaveTextContent(/^true$/i));
  });

  it('should disable', async () => {
    const { getByRef, getByText } = render(Demo, { initialValue: true });

    const label = getByRef('label');
    expect(label).toHaveTextContent(/^true$/i);

    const disableButton = getByText('Disable');
    disableButton.click();
    await waitFor(() => expect(label).toHaveTextContent(/^false$/i));
  });

  it('should toggle', async () => {
    const { getByRef, getByText } = render(Demo);

    const label = getByRef('label');
    const toggleButton = getByText('Toggle');

    expect(label).toHaveTextContent(/^false$/i);

    toggleButton.click();
    await waitFor(() => expect(label).toHaveTextContent(/^true$/i));

    toggleButton.click();
    await waitFor(() => expect(label).toHaveTextContent(/^false$/i));
  });
});
