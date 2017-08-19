import * as actions from '../actions';
import _ from 'lodash';

const initialState = {
  byId: {},
  ids: [],
};

function maxKey(obj) {
  const keys = Object.keys(obj);
  if (keys.length === 0) {
    return 1;
  }

  return Math.max.apply(null, keys.map(n => parseInt(n, 10)));
};

function addTodo(state, action) {
  // Replace id with UUID which is generated in saga.
  const id = maxKey(state.byId) + 1;
  const { content, due_date } = action.payload;
  const newTodo = { id, content, due_date };

  return {
    ...state,
    byId: {
      ...state.byId,
      [newTodo.id]: newTodo,
    },
    ids: [ ...state.ids, newTodo.id ],
  };
}

function updateTodo(state, action) {
  const { id, content, due_date } = action.payload;
  const todo = state.byId[id];
  const updatedTodo = { ...todo, content, due_date };

  return {
    ...state,
    byId: {
      ...state.byId,
      [updatedTodo.id]: updatedTodo,
    }
  };
}

function toggleTodoDone(state, action) {
  const { id } = action.payload;
  const todo = state.byId[id];
  const updatedTodo = { ...todo, done: !todo.done };

  return {
    ...state,
    byId: {
      ...state.byId,
      [updatedTodo.id]: updatedTodo,
    }
  };
}

function deleteTodo(state, action) {
  const { id } = action.payload;
  const byId = _.omit(state.byId, [id]);
  const ids = state.ids.filter(item => item !== id);

  return {
    ...state,
    byId,
    ids,
  };
}

function toggleDoneFilter(state) {
  return {
    ...state,
    ui: {
      ...state.ui,
      doneFilter: !state.ui.doneFilter,
    },
  };
}

export default function todosReducer(state = initialState, action) {
  switch(action.type) {
  case actions.ADD_TODO:
    return addTodo(state, action);
  case actions.UPDATE_TODO:
    return updateTodo(state, action);
  case actions.TOGGLE_TODO_DONE:
    return toggleTodoDone(state, action);
  case actions.DELETE_TODO:
    return deleteTodo(state, action);
  default:
    return state;
  }
}

export function filteredTodos(state, done) {
  // When done is required, return all todos including done.
  if (done) {
    return state.ids;
  }

  return state.ids.filter(id => !state.byId[id].done);
}

