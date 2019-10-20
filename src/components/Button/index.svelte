<script>
  export let color = null;
  export let disabled = false;
  export let href = null;
  export let mode = null;
  export let type = "button";
</script>

<style src="./style.css">
</style>

{#if href}
  <a {href}>
    <slot />
  </a>
{:else}
  <button class="{mode} {color}" role={"button"} {type} on:click {disabled}>
    <slot />
  </button>
{/if}
