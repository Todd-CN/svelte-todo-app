<script>
  import Logo from "./Logo.svelte";
  import TodoItem from "./TodoItem.svelte";
  import TestButton from "./TestButton.svelte";

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
    console.log("addTodo called");
    if (event.which === ENTER_KEY) {
      console.log("Enter key pressed", newTodo);

      //non-mutating - good practice to use this - svelte knows to update
      todos = [
        { id: tempId, completed: false, title: newTodo, editing: false },
        ...todos,
      ];

      //mutating
      // todos.push({
      //   id: tempId,
      //   completed: false,
      //   title: newTodo,
      //   editing: false,
      // });
      // todos = todos; // quirk of svelte- very specific to svelte - array mutable vs immutable - you telling svelte it that the 'todos' array is being changed
      // whenever a variable changes in svelte- svelte knows to update the UI/html

      //If we don't have this next line, all of the new todos would get set with the same ID
      tempId = tempId + 1;

      // This ensures that the input text box goes back to an empty string after we add a new todo/ it resets it
      newTodo = "";
    }
  }

  function editTodo(todo) {
    todo.isEditing = true;
    todos = todos;
    // todos = [...todos]; usually used when you're ADDing to the array
  }

  function doneEdit(todo) {
    todo.isEditing = false;
    todos = todos;
  }

  function deleteTodo(id) {
    todos = todos.filter((todo) => todo.id !== id);
    console.log("deleteTodo called", id);
  }
  // filter returns a brand new array that filters only the items that match the condition we pass in
  // filter doesn't mutate the original array (splice will modify the original)

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

  $: todosRemaining = todos.filter((todo) => !todo.completed).length;

  // if the current filter is 'all', we are just going to return 'todos' (the default state)
  // if current filter is 'completed', we filter the todo.completed ones
  // if current filter is not completed, we filter the not completed ones
  $: filteredTodos =
    currentFilter === "all"
      ? todos
      : currentFilter === "completed"
      ? todos.filter((currentTodo) => currentTodo.completed)
      : todos.filter((currentTodo) => !currentTodo.completed);
</script>

<div class="container">
  <Logo />

  <input
    type="text"
    class="todo-input"
    placeholder="What needs to be done"
    bind:value={newTodo}
    on:keydown={addTodo}
  />

  {#each todos as currentTodo}
    <TodoItem
      todo={currentTodo}
      onDelete={deleteTodo}
      onEdit={editTodo}
      onEditCompleted={doneEdit}
    />
    <!--
         By calling onDelete{deleteTodo(currentTodo.id)}, you are executing the function immediately. That's not what you want.
      -->
    <!--
        The reason onDelete{() => deleteTodo(currentTodo.id)} is "how it works", is because one needs to pass a reference to the function needing to be executed.
        In other words, you need a function declaration, which will be invoked ONLY by the on:click/(onDelete in this example), and inside of the function declaration you 
        can call your handler(deleteTodo in this example) with as many arguments/parameters as you want
      -->
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
      <TestButton />
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
