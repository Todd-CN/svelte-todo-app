<script>
  function buttonClick() {
    console.log("Button clicked");
  }
</script>

<button on:click={buttonClick}>Test Button</button>

<!-- Remember- these set styles are scoped only to this component -->
<style>
  button {
    font-weight: bold;
    color: white;
    background-color: red;
  }
</style>
