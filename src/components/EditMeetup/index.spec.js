import { render } from '@testing-library/svelte'

import { initialMeetups } from "../../stores/meetups";
import EditMeetup from './index.svelte';

describe('EditMeetup', () => {

  it('renders a modal to create a new meetup', () => {
    const { getByText } = render(EditMeetup)
    const modal = getByText('Create Meetup');
    expect(modal).toBeInTheDocument()
  });

  it('renders a modal to edit an existing meetup', () => {
    const id = initialMeetups[0].id;
    const { getByText } = render(EditMeetup, { props: { id } })
    const modal = getByText('Edit Meetup');
    expect(modal).toBeInTheDocument()
  });

});
