import { render } from '@testing-library/svelte'

import { initialMeetups } from "../../stores/meetups";
import MeetupDetail from './index.svelte';

describe('MeetupDetail', () => {

  it('renders the expected buttons', () => {
    const id = initialMeetups[0].id;
    const { getByText } = render(MeetupDetail, { props: { id } });
    expect(getByText('Contact')).toBeInTheDocument();
    expect(getByText('Close')).toBeInTheDocument();
  });
});
