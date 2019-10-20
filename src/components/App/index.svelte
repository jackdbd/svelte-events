<script>
  import Layout from '../Layout';
  import ImageExample from '../ImageExample';
  import Button from '../Button';

  const handleClick = () => {
    alert('I was clicked');
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
      <Button color="success" mode="outline">Button with outline success</Button>
      <Button href="mailto:{'jackdebidda@gmail.com'}">Contact</Button>
    </div>
  </div>
</Layout>
