import { render } from '@testing-library/svelte'

import TextInput from './index.svelte';

describe('TextInput', () => {
  it('renders a label with the expected text', () => {
    const id = 'some-id';
    const label = 'Some Label';
    const value = 'Some input';
    const { container, getByText } = render(TextInput, { props: { id, label, value } });
    expect(getByText(label)).toBeInTheDocument();
    expect(container).toHaveTextContent(label);
  });
});
