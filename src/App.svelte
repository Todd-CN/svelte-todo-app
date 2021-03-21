<script>
  import { onMount } from "svelte";
  // import { fly } from "svelte/transition";
  import Logo from "./Logo.svelte";
  import TodoItem from "./TodoItem.svelte";

  const ENTER_KEY = 13;
  const ESCAPE_KEY = 27;

  let currentFilter = "all";
  let tempId = 4;
  let newTodo = "";
  let todos = [];

  function fetchTodos() {
    fetch("https://jsonplaceholder.typicode.com/todos/").then((response) => {
      response.json().then((jsonResult) => {
        todos = jsonResult.slice(0, 5);
        // console.log(todos)
      });
    });
  }

  fetchTodos();

  function addTodo(event) {
    if (event.which === ENTER_KEY) {
      todos.push({
        id: tempId,
        completed: false,
        title: newTodo,
        editing: false,
      });

      todos = todos;
      tempId = tempId + 1;
      newTodo = "";
    }
  }

  function editTodo(todo) {
    todo.editing = true;
    todos = todos;
  }

  function doneEdit(todo) {
    todo.editing = false;
    todos = todos;
  }

  function doneEditKeydown(todo, event) {
    if (event.which === ENTER_KEY) {
      doneEdit(todo);
    }
  }

  function deleteTodo(id) {
    todos = todos.filter((todo) => todo.id !== id);
  }

  function clearCompleted() {
    todos = todos.filter((todo) => !todo.completed);
  }

  function checkAllTodos(event) {
    todos.forEach((todo) => (todo.completed = event.target.checked));
    todos = todos;
  }

  function updateFilter(filter) {
    currentFilter = filter;
  }

  onMount(async () => {
    const res = await fetch("https://api.kanye.rest");
    const response = await res.json();
    console.log(response.quote);
  });

  $: todosRemaining = todos.filter((todo) => !todo.completed).length;

  // if the current filter is 'all', we are just going to return 'todos' (the default state)
  // if current filter is 'completed', we filter the todo.completed ones
  // if current filter is not completed, we filter the not completed ones
  $: filteredTodos =
    currentFilter === "all"
      ? todos
      : currentFilter === "completed"
      ? todos.filter((todo) => todo.completed)
      : todos.filter((todo) => !todo.completed);
</script>

<div class="container">
  <!-- 1. Make this img tag in a separate component
	 2. Name the component 'Logo' -->
  <Logo />

  <input
    type="text"
    class="todo-input"
    placeholder="What needs to be done"
    bind:value={newTodo}
    on:keydown={addTodo}
  />

  {#each filteredTodos as currentTodo}
    <TodoItem todo={currentTodo} />
  {/each}

  <div class="extra-container">
    <div>
      <label><input type="checkbox" on:change={checkAllTodos} />Check All</label
      >
    </div>
    <div>{todosRemaining} items left</div>
  </div>

  <div class="extra-container">
    <div>
      <button
        on:click={() => updateFilter("all")}
        class:active={currentFilter === "all"}>All</button
      >
      <button
        on:click={() => updateFilter("active")}
        class:active={currentFilter === "active"}>Active</button
      >
      <button
        on:click={() => updateFilter("completed")}
        class:active={currentFilter === "completed"}>Completed</button
      >
    </div>

    <div>
      <button on:click={clearCompleted}>Clear Completed</button>
    </div>
  </div>
</div>

<style>
  .container {
    max-width: 600px;
    margin: 0 auto;
  }
  .logo {
    display: block;
    margin: 20px auto;
    height: 75px;
  }
  .todo-input {
    width: 100%;
    padding: 10px 18px;
    font-size: 18px;
    margin-bottom: 16px;
  }
  .remove-item {
    cursor: pointer;
    margin-left: 14px;
    /* &:hover {
      color: black;
    } */
  }

  /* .todo-item-edit {
    font-size: 24px;
    color: #2c3e50;
    margin-left: 12px;
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    font-family: 'Avenir', Helvetica, Arial, sans-serif; */
  /* &:focus {
      outline: none;
    } */
  /* } */
  .completed {
    text-decoration: line-through;
    color: grey;
  }
  .extra-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    border-top: 1px solid lightgrey;
    padding-top: 14px;
    margin-bottom: 14px;
    /* input {
      margin-right: 8px;
    } */
  }
  button {
    font-size: 14px;
    background-color: white;
    appearance: none;
    /* &:hover {
      background: salmon;
    } */
    /* &:focus {
      outline: none;
    } */
  }
  /* .active {
    background: salmon;
  } */
</style>
