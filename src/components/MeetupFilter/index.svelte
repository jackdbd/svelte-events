<script>
  import { createEventDispatcher } from "svelte";

  import Button from "../Button";

  const dispatch = createEventDispatcher();

  // Custom event with its detail.
  const eventType = 'set-filter';
  let eventDetail = { favoriteOnly: false };

  let selectedMeetups = 'all';

  const onClickAll = () => {
    selectedMeetups = 'all';
    eventDetail = { favoriteOnly: false };
    dispatch(eventType, eventDetail);
  }

  const onClickFavoriteOnly = () => {
    selectedMeetups = 'favorite';
    eventDetail = { favoriteOnly: true };
    dispatch(eventType, eventDetail);
  }
</script>

<style src="./style.css">
</style>

<div>
  <Button
    mode={selectedMeetups === 'all' ? null : 'outline'}
    on:click={onClickAll}>All</Button>
  <Button
    mode={selectedMeetups === 'favorite' ? null : 'outline'}
    on:click={onClickFavoriteOnly}>Favorites</Button>
</div>
