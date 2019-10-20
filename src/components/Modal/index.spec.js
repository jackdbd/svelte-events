import { render } from '@testing-library/svelte'

import { initialMeetups } from "../../stores/meetups";
import Modal from './index.svelte';

describe('Modal', () => {

  it('can be closed', () => {
    const title = 'Some title';
    const { getByText } = render(Modal, { props: { title } });
    expect(getByText('Close')).toBeInTheDocument();
  });
});
