<script>
  import { createEventDispatcher } from "svelte";
  import { fly, fade } from "svelte/transition";

  import Button from "../Button";

  export let title;

  const dispatch = createEventDispatcher();
  const CANCEL_EVENT = 'cancel';

  function closeModal() {
    dispatch(CANCEL_EVENT);
  }
</script>

<style src="./style.css">
</style>

<div transition:fade class="modal-backdrop" on:click={closeModal} />
<div transition:fly={{ y: 300 }} class="modal">
  <h1>{title}</h1>
  <div class="content">
    <slot />
  </div>
  <footer>
    <slot name="footer">
      <Button on:click={closeModal}>Close</Button>
    </slot>
  </footer>
</div>
