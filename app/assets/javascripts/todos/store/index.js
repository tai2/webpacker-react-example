import { createStore } from 'redux';
import reducers from '../reducers';

function convert(state) {
  const byId = state.todos.reduce((prev, curr) => {
    prev[curr.id] = curr;
    return prev;
  }, {});
  const ids = state.todos.map(todo => todo.id);

  return {
    todos: {
      byId,
      ids,
    },
  };
}

export default function createAppStore(preloadedState) {
  return createStore(
    reducers,
    convert(preloadedState),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
}

