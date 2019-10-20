import { writable } from 'svelte/store';

export const initialMeetups = [
  {
    address: '27th Nerd Road, 32523 New York',
    description: 'In this meetup, we will have some experts that teach you how to code!',
    email: 'code@test.com',
    id: 'm1',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Caffe_Nero_coffee_bar%2C_High_St%2C_Sutton%2C_Surrey%2C_Greater_London.JPG/800px-Caffe_Nero_coffee_bar%2C_High_St%2C_Sutton%2C_Surrey%2C_Greater_London.JPG',
    isFavorite: false,
    subtitle: 'Learn to code in 2 hours',
    title: 'Coding Bootcamp'
  },
  {
    address: '27th Nerd Road, 32523 New York',
    description: 'We will simply swim some rounds!',
    email: 'swim@test.com',
    id: 'm2',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Olympic_swimming_pool_%28Tbilisi%29.jpg/800px-Olympic_swimming_pool_%28Tbilisi%29.jpg',
    isFavorite: false,
    subtitle: "Let's go for some swimming",
    title: 'Swim Together'
  }
];

// Use the writable function as a starting point for a custom store.
const meetups = writable(initialMeetups);

// Add a new meetup.
const addMeetup = (data) => {
  console.log("addMeetup", data);
  const newMeetup = {
    ...data,
    id: Math.random().toString(),
    isFavorite: false
  };
  meetups.update(items => {
    return [newMeetup, ...items];
  });
};

// Remove a meetup.
const removeMeetup = (id) => {
  console.log("removeMeetup", id);
  meetups.update(items => {
    return items.filter(i => i.id !== id);
  });
};

// Update an existing meetup.
const updateMeetup = (id, data) => {
  console.log("updateMeetup", id, data);
  meetups.update(items => {
    const index = items.findIndex(i => i.id === id);
    const updatedMeetup = { ...items[index], ...data };
    const updatedMeetups = [...items];
    updatedMeetups[index] = updatedMeetup;
    return updatedMeetups;
  });
};

// Favorite/Unfavorite an existing meetup.
const toggleFavorite = id => {
  console.log("toggleFavorite", id);
  meetups.update(items => {
    const updatedMeetup = { ...items.find(m => m.id === id) };
    updatedMeetup.isFavorite = !updatedMeetup.isFavorite;
    const meetupIndex = items.findIndex(m => m.id === id);
    const updatedMeetups = [...items];
    updatedMeetups[meetupIndex] = updatedMeetup;
    return updatedMeetups;
  });
};

// Augment the basic store with the method we have just defined.
export const meetupStore = {
  addMeetup,
  // Every svelte store must have a subscribe method. We keep the original one.
  subscribe: meetups.subscribe,
  toggleFavorite,
  removeMeetup,
  updateMeetup,
}
