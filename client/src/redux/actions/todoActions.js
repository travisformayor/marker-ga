import uuid from 'uuid';

// Action
const ADD_TODO = 'ADD_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const DELETE_TODO = 'DELETE_TODO';
const EDIT_TODO = 'EDIT_TODO';

// Action Creator
export const addTodo = task => {
  return {
    type: ADD_TODO,
    todo: { // this can also be called payload
      id: uuid(),
      task: task,
      completed: false,
    }
  }
}

export const toggleTodo = id => {
  return {
    type: TOGGLE_TODO,
    id,
  }
}

export const deleteTodo = id => {
  return {
    type: DELETE_TODO,
    id,
  }
}

export const editTodo = (id, newText) => {
  return {
    type: EDIT_TODO,
    id,
    newText,
  }
}