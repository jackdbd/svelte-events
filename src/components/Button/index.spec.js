import { render } from '@testing-library/svelte'

import Button from './index.svelte';

describe('Button', () => {

  it('has the expected ARIA role', async () => {
    const { findByRole } = render(Button)
    const btn = await findByRole('button');
    expect(btn).toBeInTheDocument()
  });

  it('can be disabled', async () => {
    const { findByRole } = render(Button, { props: { disabled: true } })
    const btn = await findByRole('button');
    expect(btn).toBeDisabled();
  });
});
