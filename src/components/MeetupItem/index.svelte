<script>
  import { createEventDispatcher } from "svelte";

  import { meetupStore } from "../../stores/meetups.js";
  import Badge from "../Badge";
  import Button from "../Button";

  export let address;
  export let description;
  export let email;
  export let id;
  export let imageUrl;
  export let isFavorite;
  export let subtitle;
  export let title;

  // Event dispatcher and custom events dispatched by this component.
  const dispatch = createEventDispatcher();
  const EDIT_EVENT = 'edit';
  const SHOW_DETAILS_EVENT = 'show-details';

  const editMeetup = () => {
    dispatch(EDIT_EVENT, id);
  }

  const toggleFavorite = () => {
    meetupStore.toggleFavorite(id);
  }

  const showDetails = () => {
    dispatch(SHOW_DETAILS_EVENT, id);
  }
</script>

<style src="./style.css">  
</style>

<article>
  <header>
    <h1>
      {title}
      {#if isFavorite}
        <Badge>FAVORITE</Badge>
      {/if}
    </h1>
    <h2>{subtitle}</h2>
    <p>{address}</p>
  </header>
  <div class="image">
    <img alt={title} src={imageUrl} />
  </div>
  <div class="content">
    <p>{description}</p>
  </div>
  <footer>
    <Button mode="outline" on:click={editMeetup}>
      Edit
    </Button>
    <Button
      color={isFavorite ? null : 'success'}
      mode="outline"
      on:click={toggleFavorite}>
      {isFavorite ? 'Unfavorite' : 'Favorite'}
    </Button>
    <Button  on:click={showDetails}>
      Show Details
    </Button>
  </footer>
</article>
