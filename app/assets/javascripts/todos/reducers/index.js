import * as actions from '../actions';
import _ from 'lodash';

const initialState = {
  todoById: {},
  todos: [],
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
  const id = maxKey(state.todoById) + 1;
  const { content, due_date } = action.payload;
  const newTodo = { id, content, due_date };

  return {
    ...state,
    todoById: {
      ...state.todoById,
      [newTodo.id]: newTodo,
    },
    todos: [ ...state.todos, newTodo.id ],
  };
}

function updateTodo(state, action) {
  const { id, content, due_date } = action.payload;
  const todo = state.todoById[id];
  const updatedTodo = { ...todo, content, due_date };

  return {
    ...state,
    todoById: {
      ...state.todoById,
      [updatedTodo.id]: updatedTodo,
    }
  };
}

function checkTodo(state, action) {
  const { id } = action.payload;
  const todo = state.todoById[id];
  const updatedTodo = { ...todo, done: true };

  return {
    ...state,
    todoById: {
      ...state.todoById,
      [updatedTodo.id]: updatedTodo,
    }
  };
}

function uncheckTodo(state, action) {
  const { id } = action.payload;
  const todo = state.todoById[id];
  const updatedTodo = { ...todo, done: false };

  return {
    ...state,
    todoById: {
      ...state.todoById,
      [updatedTodo.id]: updatedTodo,
    }
  };
}

function deleteTodo(state, action) {
  const { id } = action.payload;
  const todoById = _.omit(state.todoById, [id]);
  const todos = state.todos.filter(item => item !== id);

  return {
    ...state,
    todoById,
    todos,
  };
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
  case actions.ADD_TODO:
    return addTodo(state, action);
  case actions.UPDATE_TODO:
    return updateTodo(state, action);
  case actions.CHECK_TODO:
    return checkTodo(state, action);
  case actions.UNCHECK_TODO:
    return uncheckTodo(state, action);
  case actions.DELETE_TODO:
    return deleteTodo(state, action);
  default:
    return state;
  }
}

