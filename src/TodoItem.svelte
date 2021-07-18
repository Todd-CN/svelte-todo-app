<script>
  import { fly } from "svelte/transition";
  export let onDelete;
  export let todo;
  export let onEdit;
  export let onEditCompleted;
  const ENTER_KEY = 13;
</script>

<div class="todo-item">
  <div class="todo-item-left" transition:fly={{ y: 20, duration: 300 }}>
    <input type="checkbox" bind:checked={todo.completed} />
    {#if todo.isEditing}
      <input
        class="todo-item-edit"
        type="text"
        bind:value={todo.title}
        on:blur={() => onEditCompleted(todo)}
        on:keydown={(e) => {
          if (e.which === ENTER_KEY) {
            onEditCompleted(todo);
          }
        }}
        autofocus
      />
    {:else}
      <div
        class:completed={todo.completed}
        class="todo-item-label"
        on:dblclick={() => onEdit(todo)}
      >
        {todo.title}
      </div>
    {/if}
  </div>
  <div class="remove-item" on:click={() => onDelete(todo.id)}>&times;</div>
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
  .todo-item-edit {
    font-size: 24px;
    color: #2c3e50;
    margin-left: 12px;
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    font-family: "Avenir", Helvetica, Arial, sans-serif;
  }
</style>
