
export const ADD_TODO_REQUESTED = 'ADD_TODO:REQUESTED';
export const ADD_TODO_RECEIVED = 'ADD_TODO:RECEIVED';
export const UPDATE_TODO = 'UPDATE_TODO';
export const TOGGLE_TODO_DONE = 'TOGGLE_TODO_DONE';
export const DELETE_TODO = 'DELETE_TODO';
export const TOGGLE_DONE_FILTER = 'TOGGLE_DONE_FILTER';
export const SELECT_ORDER = 'SELECT_ORDER';

export function addTodoRequested(content, dueDate) {
  return {
    type: ADD_TODO_REQUESTED,
    payload: { content, dueDate },
  };
}

export function addTodoReceived(payload) {
  return {
    type: ADD_TODO_RECEIVED,
    payload: payload,
    error: payload instanceof Error,
  };
}

export function updateTodo(id, content, dueDate) {
  return {
    type: UPDATE_TODO,
    payload: { id, content, dueDate },
  };
}

export function toggleTodoDone(id) {
  return {
    type: TOGGLE_TODO_DONE,
    payload: { id },
  };
}

export function deleteTodo(id) {
  return {
    type: DELETE_TODO,
    payload: { id },
  };
}

export function toggleDoneFilter() {
  return {
    type: TOGGLE_DONE_FILTER,
  };
}

export function selectOrder(sortBy) {
  return {
    type: SELECT_ORDER,
    payload: { sortBy },
  };
}
