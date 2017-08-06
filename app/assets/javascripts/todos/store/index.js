import { createStore } from 'redux';
import reducers from '../reducers';

function convert(state) {
  const todoById = state.todos.reduce((prev, curr) => {
    prev[curr.id] = curr;
    return prev;
  }, {});
  const todos = state.todos.map(todo => todo.id);

  return {
    todoById,
    todos,
  };
}

export default function createAppStore(preloadedState) {
  return createStore(
    reducers,
    convert(preloadedState),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
}

