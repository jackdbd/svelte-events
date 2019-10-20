import { render } from '@testing-library/svelte'

import MeetupGrid from './index.svelte';
import { initialMeetups } from "../../stores/meetups";

describe('MeetupGrid', () => {
  const meetups = initialMeetups;

  it('renders a button to add new meetups', async () => {
    const { findByText } = render(MeetupGrid, { props: { meetups } });
    const btn = await findByText('New Meetup');
    expect(btn).toBeInTheDocument();
  });

  it('renders a section to add/show meetups', async () => {
    const { getByTestId } = render(MeetupGrid, { props: { meetups } });
    expect(getByTestId('meetups-controls')).toBeInTheDocument();
  });

  it('renders a grid with as many children as meetups', () => {
    const { getByTestId } = render(MeetupGrid, { props: { meetups } });
    const grid = getByTestId('meetups-grid');
    expect(grid.childElementCount).toBe(meetups.length);
  });
});
