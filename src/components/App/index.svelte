<script>
  import Badge from "../Badge";
  import Button from '../Button';
  import ImageExample from '../ImageExample';
  import Layout from '../Layout';
  import TextInput from '../TextInput';
  import { isEmpty, isValidEmail } from "../../helpers/validation.js";

  let description = "";
  let email = "";
  let title = "";

  $: descriptionValid = !isEmpty(description);
  $: emailValid = isValidEmail(email);
  $: titleValid = !isEmpty(title);

  let isFav = true;

  const handleClick = () => {
    alert('I was clicked');
  }

  const toggleIsFav = () => {
    isFav = !isFav;
  }
</script>

<style src="./style.scss">

</style>

<Layout>
  <div class="container">
    <div class="container__top">
      <ImageExample />
    </div>
    <div class="container__middle">
      <Button>Default Button</Button>
      <Button on:click={handleClick}>Button with handler</Button>
      <Button color="success">Button success</Button>
      <Button mode="outline">Button with outline</Button>
      <Button color="success" mode="outline" on:click={toggleIsFav}>Button with outline success</Button>
      <Button href="mailto:{'jackdebidda@gmail.com'}">Contact</Button>
      <TextInput
        id="title"
        label="Title"
        on:input={event => (title = event.target.value)}
        valid={titleValid}
        validityMessage="Please enter a valid title."
        value={'title'} />
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
      bind:value={description}
      label="Description"
      controlType="textarea"
      valid={descriptionValid}
      validityMessage="Please enter a valid description." />
      {#if isFav}
        <Badge>FAVORITE</Badge>
      {/if}
    </div>
  </div>
</Layout>
