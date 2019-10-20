import { render } from '@testing-library/svelte'

import MeetupItem from './index.svelte';

describe('MeetupItem', () => {
  const id = 'meetup-id-0';
  const title = 'Some title';
  const subtitle = 'Some subtitle';
  const description =  'Some description';
  const imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Caffe_Nero_coffee_bar%2C_High_St%2C_Sutton%2C_Surrey%2C_Greater_London.JPG/800px-Caffe_Nero_coffee_bar%2C_High_St%2C_Sutton%2C_Surrey%2C_Greater_London.JPG';
  const address = '27th Nerd Road, 32523 New York';
  const email = 'code@test.com';
  
  it('renders the expected number of buttons', async () => {
    const props = { address, description, email, id, imageUrl, isFavorite: false, subtitle, title };
    const { findAllByRole } = render(MeetupItem, { props });
    const buttons = await findAllByRole('button');
    expect(buttons.length).toBe(3);
  });

  it('renders the expected uppercase text if the meetup is favorite', () => {
    const props = { address, description, email, id, imageUrl, isFavorite: true, subtitle, title };
    const { getByText } = render(MeetupItem, { props });
    expect(getByText('FAVORITE')).toBeInTheDocument();
  });
});
