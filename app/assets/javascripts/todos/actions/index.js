
export const ADD_TODO_REQUESTED = 'ADD_TODO:REQUESTED';
export const ADD_TODO_RECEIVED = 'ADD_TODO:RECEIVED';
export const UPDATE_TODO_REQUESTED = 'UPDATE_TODO_REQUESTED';
export const UPDATE_TODO_RECEIVED = 'UPDATE_TODO_RECEIVED';
export const TOGGLE_TODO_DONE_REQUESTED = 'TOGGLE_TODO_DONE_REQUESTED';
export const TOGGLE_TODO_DONE_RECEIVED = 'TOGGLE_TODO_DONE_RECEIVED';
export const DELETE_TODO_REQUESTED = 'DELETE_TODO_REQUESTED';
export const DELETE_TODO_RECEIVED = 'DELETE_TODO_RECEIVED';
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

export function updateTodoRequested(id, content, dueDate) {
  return {
    type: UPDATE_TODO_REQUESTED,
    payload: { id, content, dueDate },
  };
}

export function updateTodoReceived(payload) {
  return {
    type: UPDATE_TODO_RECEIVED,
    payload: payload,
    error: payload instanceof Error,
  };
}

export function toggleTodoDoneRequested(id) {
  return {
    type: TOGGLE_TODO_DONE_REQUESTED,
    payload: { id },
  };
}

export function toggleTodoDoneReceived(payload) {
  return {
    type: TOGGLE_TODO_DONE_RECEIVED,
    payload: payload,
    error: payload instanceof Error,
  };
}

export function deleteTodoRequested(id) {
  return {
    type: DELETE_TODO_REQUESTED,
    payload: { id },
  };
}

export function deleteTodoReceived(payload) {
  return {
    type: DELETE_TODO_RECEIVED,
    payload: payload,
    error: payload instanceof Error,
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
