import * as actions from '../actions';
import _ from 'lodash';

const initialState = {
  byId: {},
  ids: [],
};

function addTodoReceived(state, action) {
  const newTodo = action.payload;

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
  const { id, content, dueDate } = action.payload;
  const todo = state.byId[id];
  const updatedTodo = { ...todo, content, dueDate };

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
  case actions.ADD_TODO_RECEIVED:
    return addTodoReceived(state, action);
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

export function visibleTodos(state, sortBy, done) {
  // When done is required, return all todos including done.
  const ids = done
    ? state.ids
    : state.ids.filter(id => !state.byId[id].done);

  const [prop, order] = sortBy.split('-');
  const time = (id) => new Date(state.byId[id][prop]).getTime();
  return _.orderBy(ids, time, [order]);
}

