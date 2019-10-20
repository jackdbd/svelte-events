<script>
  import { createEventDispatcher } from "svelte";
  import { flip } from "svelte/animate";
  import { scale } from "svelte/transition";

  import Button from "../Button";
  import MeetupFilter from "../MeetupFilter";
  import MeetupItem from "../MeetupItem";

  // Array of all meetups available.
  export let meetups;

  // If true, show only favorite meetups.
  let favoriteOnly = false;

  // Array of meetups to show.
  $: meetupsToShow = favoriteOnly ? meetups.filter(m => m.isFavorite) : meetups;

  /*
   * Events dispatched from child components can be listened to in their parent. 
   * https://svelte.dev/docs#createEventDispatcher
   */
  const dispatch = createEventDispatcher();
  const ADD_EVENT = 'add';

  const addNewMeetup = () => {
    const detail = { date: new Date() };
    dispatch(ADD_EVENT, detail);
  }

  const setFilter = (event) => {
    favoriteOnly = event.detail.favoriteOnly;
  }
</script>

<style src="./style.css">
</style>

<section data-testid="meetups-controls" id="meetups-controls">
  <MeetupFilter on:set-filter={setFilter} />
  <Button color="success" on:click={addNewMeetup}>New Meetup</Button>
</section>
<section data-testid="meetups-grid" id="meetups-grid">
  {#each meetupsToShow as meetup (meetup.id)}
    <div transition:scale animate:flip={{ duration: 300 }}>
      <MeetupItem
        address={meetup.address}
        description={meetup.description}
        email={meetup.email}
        id={meetup.id}
        imageUrl={meetup.imageUrl}
        isFavorite={meetup.isFavorite}
        on:edit
        on:show-details
        subtitle={meetup.subtitle}
        title={meetup.title} />
    </div>
  {/each}
</section>
