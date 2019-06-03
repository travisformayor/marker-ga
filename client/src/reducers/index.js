import { combineReducers } from 'redux';
import todos from './todoReducer'; // import todos state from todoReducer

// Combine Reducers
const rootReducer = combineReducers({
  todos: todos,
});

export default rootReducer;
