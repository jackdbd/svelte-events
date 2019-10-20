<script>
  import { createEventDispatcher } from "svelte";

  import { isEmpty, isValidEmail } from "../../helpers/validation.js";
  import { meetupStore } from "../../stores/meetups.js";
  import Button from "../Button";
  import Modal from "../Modal";
  import TextInput from "../TextInput";

  // Id of the meetup to edit/delete. If undefined, it means that we are
  // creating a new meetup instead.
  export let id = undefined;

  let address = "";
  let description = "";
  let email = "";
  let imageUrl = "";
  let subtitle = "";
  let title = "";

  if (id) {
    const unsubscribe = meetupStore.subscribe(items => {
      const selectedMeetup = items.find(i => i.id === id);
      address = selectedMeetup.address;
      description = selectedMeetup.description;
      email = selectedMeetup.email;
      imageUrl = selectedMeetup.imageUrl;
      subtitle = selectedMeetup.subtitle;
      title = selectedMeetup.title;
    });

    // We have retrieved from the store the meetup we were interested in, we
    // have reassigned the local attributes used in this component, so we can
    // unsubscribe.
    unsubscribe();
  }

  const dispatch = createEventDispatcher();
  const CANCEL_EVENT = 'cancel';
  const SAVE_EVENT = 'save';

  $: addressValid = !isEmpty(address);
  $: descriptionValid = !isEmpty(description);
  $: emailValid = isValidEmail(email);
  $: imageUrlValid = !isEmpty(imageUrl);
  $: subtitleValid = !isEmpty(subtitle);
  $: titleValid = !isEmpty(title);

  $: formIsValid =
    addressValid &&
    descriptionValid &&
    emailValid &&
    imageUrlValid &&
    subtitleValid &&
    titleValid;

  const submitForm = () => {
    const data = {
      address,
      description,
      email,
      imageUrl,
      subtitle,
      title,
    };

    if (id) {
      meetupStore.updateMeetup(id, data);
    } else {
      meetupStore.addMeetup(data);
    }
    dispatch(SAVE_EVENT);
  }

  const deleteMeetup = () => {
    meetupStore.removeMeetup(id);
    dispatch(SAVE_EVENT);
  }

  const cancel = () => {
    dispatch(CANCEL_EVENT);
  }
</script>

<style src="./style.css">
</style>

<Modal title={id ? "Edit Meetup" : "Create Meetup"} on:cancel>
  <form on:submit={submitForm}>
    <TextInput
      id="title"
      label="Title"
      valid={titleValid}
      validityMessage="Please enter a valid title."
      value={title}
      on:input={event => (title = event.target.value)} />
    <TextInput
      id="subtitle"
      label="Subtitle"
      valid={subtitleValid}
      validityMessage="Please enter a valid subtitle."
      value={subtitle}
      on:input={event => (subtitle = event.target.value)} />
    <TextInput
      id="address"
      label="Address"
      valid={addressValid}
      validityMessage="Please enter a valid address."
      value={address}
      on:input={event => (address = event.target.value)} />
    <TextInput
      id="imageUrl"
      label="Image URL"
      valid={imageUrlValid}
      validityMessage="Please enter a valid image url."
      value={imageUrl}
      on:input={event => (imageUrl = event.target.value)} />
    <TextInput
      id="email"
      label="E-Mail"
      type="email"
      valid={emailValid}
      validityMessage="Please enter a valid email address."
      value={email}
      on:input={event => (email = event.target.value)} />
    <TextInput
      id="description"
      label="Description"
      controlType="textarea"
      valid={descriptionValid}
      validityMessage="Please enter a valid description."
      bind:value={description} />
  </form>
  <div slot="footer">
    <Button mode="outline" on:click={cancel}>Cancel</Button>
    <Button disabled={!formIsValid} on:click={submitForm}>
      Save
    </Button>
    {#if id}
      <Button on:click={deleteMeetup}>Delete</Button>
    {/if}
  </div>
</Modal>
