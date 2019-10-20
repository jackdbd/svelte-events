<script>
  import { onDestroy, createEventDispatcher } from "svelte";

  import { meetupStore } from "../../stores/meetups.js";
  import Button from "../Button";

  // Id of the meetup.
  export let id;

  let selectedMeetup;

  const unsubscribe = meetupStore.subscribe(items => {
    selectedMeetup = items.find(i => i.id === id);
  });

  // Event dispatcher and custom events dispatched by this component.
  const dispatch = createEventDispatcher();
  const CLOSE_EVENT = 'close';

  const closeMeetup = () => {
    dispatch(CLOSE_EVENT)
  }

  onDestroy(() => {
    unsubscribe();
  });
</script>

<style src="./style.css">
</style>

<section>
  <div class="image">
    <img alt={selectedMeetup.title} src={selectedMeetup.imageUrl} />
  </div>
  <div class="content">
    <h1>{selectedMeetup.title}</h1>
    <h2>{selectedMeetup.subtitle} - {selectedMeetup.address}</h2>
    <p>{selectedMeetup.description}</p>
    <Button href="mailto:{selectedMeetup.email}">Contact</Button>
    <Button mode="outline" on:click={closeMeetup}>
      Close
    </Button>
  </div>
</section>
