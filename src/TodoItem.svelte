<script>
  import { fly } from "svelte/transition";
  export let onDelete;
  export let todo;
</script>

<div class="todo-item">
  <div class="todo-item-left" transition:fly={{ y: 20, duration: 300 }}>
    <input type="checkbox" bind:checked={todo.completed} />
    <div class:completed={todo.completed} class="todo-item-label">
      {todo.title}
    </div>
  </div>
  <div class="remove-item" on:click={onDelete}>&times;</div>
</div>

<style>
  .todo-item {
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    animation-duration: 0.3s;
  }
  .todo-item-left {
    display: flex;
    align-items: center;
  }
  .todo-item-label {
    padding: 10px;
    border: 1px solid white;
    margin-left: 12px;
  }
  .completed {
    text-decoration: line-through;
  }
  .remove-item {
    cursor: pointer;
    margin-left: 14px;
    /* &:hover {
      color: black;
    } */
  }
</style>
