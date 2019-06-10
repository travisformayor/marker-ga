// const defaultState = [];
const defaultState = [
  {
    id: 0,
    task: 'Test this Todo Page',
    completed: false
  },
  {
    id: 1,
    task: 'Learn Redux',
    completed: false
  },
  {
    id: 2,
    task: 'Learn React',
    completed: true
  }
];

// Now that we have default state, we can create our reducer
// Reducer is a switch statement
const todos = (state = defaultState, action) => {
  switch(action.type) {
    case 'ADD_TODO':
      return [...state, action.todo]; // return makes break not necessary 
    case 'TOGGLE_TODO':
      const toggleTodos = [...state]; // copy of the state
      const todoTog = toggleTodos.find(todo => todo.id === action.id);
      todoTog.completed = !todoTog.completed;
      return toggleTodos;
    case 'DELETE_TODO':
      const copyTodos = [...state];
      const updatedTodos = copyTodos.filter(todo => todo.id !== action.id);
      return updatedTodos;
    case 'EDIT_TODO':
      const editTodos = [...state];
      // console.log(editTodos);
      const todoEdit = editTodos.find(todo => todo.id === action.id);
      // console.log(action);
      // console.log(todoEdit);
      // todoEdit.task = action.task;
      todoEdit.task = action.newText;
      return editTodos;
    default:
      return state;
  }
}

export default todos;