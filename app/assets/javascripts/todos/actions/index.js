
export const ADD_TODO = 'ADD_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const CHECK_TODO = 'CHECK_TODO';
export const UNCHECK_TODO = 'UNCHECK_TODO';
export const DELETE_TODO = 'DELETE_TODO';

export function addTodo(content, dueDate) {
  return {
    type: ADD_TODO,
    payload: { content, dueDate },
  };
}

export function updateTodo(id, content, dueDate) {
  return {
    type: UPDATE_TODO,
    payload: { id, content, dueDate },
  };
}

export function checkTodo(id) {
  return {
    type: CHECK_TODO,
    payload: { id },
  };
}

export function uncheckTodo(id) {
  return {
    type: UNCHECK_TODO,
    payload: { id },
  };
}

export function deleteTodo(id) {
  return {
    type: DELETE_TODO,
    payload: { id },
  };
}
