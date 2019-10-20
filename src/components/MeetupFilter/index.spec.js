import { render } from '@testing-library/svelte'

import MeetupFilter from './index.svelte';

describe('MeetupFilter', () => {

  it('renders the expected buttons', () => {
    const { getByText } = render(MeetupFilter);
    expect(getByText('All')).toBeInTheDocument();
    expect(getByText('Favorites')).toBeInTheDocument();
  });
});
