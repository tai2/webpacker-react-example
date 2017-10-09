/*
 * Action definition follows Martin Hochel's method.
 * see details on https://medium.com/@martin_hotell/redux-typescript-typed-actions-with-less-keystrokes-d984063901d
 */

import { SINGLETON_ID, SortBy, SortOrder } from '../reducers/app'
import { IdentifiableError, Todo } from '../types'

interface Request<T> {
  requestId: number
  item: T
}

export const ADD_TODO_REQUESTED = 'ADD_TODO:REQUESTED'
export const ADD_TODO_RECEIVED = 'ADD_TODO:RECEIVED'
export const UPDATE_TODO_REQUESTED = 'UPDATE_TODO:REQUESTED'
export const UPDATE_TODO_RECEIVED = 'UPDATE_TODO:RECEIVED'
export const TOGGLE_TODO_DONE_REQUESTED = 'TOGGLE_TODO_DONE:REQUESTED'
export const TOGGLE_TODO_DONE_RECEIVED = 'TOGGLE_TODO_DONE:RECEIVED'
export const DELETE_TODO_REQUESTED = 'DELETE_TODO:REQUESTED'
export const DELETE_TODO_RECEIVED = 'DELETE_TODO:RECEIVED'
export const TOGGLE_DONE_FILTER = 'TOGGLE_DONE_FILTER'
export const SELECT_ORDER = 'SELECT_ORDER'

export function addTodoRequested(content: string, dueDate: string) {
  return {
    type: ADD_TODO_REQUESTED as typeof ADD_TODO_REQUESTED,
    payload: {
      requestId: SINGLETON_ID,
      item: { content, dueDate },
    },
  }
}

export function addTodoReceived(payload: Request<Todo> | IdentifiableError) {
  return {
    type: ADD_TODO_RECEIVED as typeof ADD_TODO_RECEIVED,
    payload,
  }
}

export function updateTodoRequested(
  id: number,
  content: string,
  dueDate: string
) {
  return {
    type: UPDATE_TODO_REQUESTED as typeof UPDATE_TODO_REQUESTED,
    payload: {
      requestId: id,
      item: { id, content, dueDate },
    },
  }
}

export function updateTodoReceived(payload: Request<Todo> | IdentifiableError) {
  return {
    type: UPDATE_TODO_RECEIVED as typeof UPDATE_TODO_RECEIVED,
    payload,
  }
}

export function toggleTodoDoneRequested(id: number) {
  return {
    type: TOGGLE_TODO_DONE_REQUESTED as typeof TOGGLE_TODO_DONE_REQUESTED,
    payload: {
      requestId: id,
      item: { id },
    },
  }
}

export function toggleTodoDoneReceived(
  payload: Request<Todo> | IdentifiableError
) {
  return {
    type: TOGGLE_TODO_DONE_RECEIVED as typeof TOGGLE_TODO_DONE_RECEIVED,
    payload,
  }
}

export function deleteTodoRequested(id: number) {
  return {
    type: DELETE_TODO_REQUESTED as typeof DELETE_TODO_REQUESTED,
    payload: {
      requestId: id,
      item: { id },
    },
  }
}

export function deleteTodoReceived(
  payload: Request<{ id: number }> | IdentifiableError
) {
  return {
    type: DELETE_TODO_RECEIVED as typeof DELETE_TODO_RECEIVED,
    payload,
  }
}

export function toggleDoneFilter() {
  return {
    type: TOGGLE_DONE_FILTER as typeof TOGGLE_DONE_FILTER,
  }
}

export function selectOrder(sortBy: SortBy, sortOrder: SortOrder) {
  return {
    type: SELECT_ORDER as typeof SELECT_ORDER,
    payload: { sortBy, sortOrder },
  }
}

function getReturnType<R>(f: (...args: any[]) => R): R {
  return null!
}

const pseudoAddTodoRequested = getReturnType(addTodoRequested)
const pseudoAddTodoReceived = getReturnType(addTodoReceived)
const pseudoUpdateTodoRequested = getReturnType(updateTodoRequested)
const pseudoUpdateTodoReceived = getReturnType(updateTodoReceived)
const pseudoToggleTodoDoneRequested = getReturnType(toggleTodoDoneRequested)
const pseudoToggleTodoDoneReceived = getReturnType(toggleTodoDoneReceived)
const pseudoDeleteTodoRequested = getReturnType(deleteTodoRequested)
const pseudoDeleteTodoReceived = getReturnType(deleteTodoReceived)
const pseudoToggleDoneFilter = getReturnType(toggleDoneFilter)
const pseudoSelectOrder = getReturnType(selectOrder)
export type AddTodoRequested = typeof pseudoAddTodoRequested
export type AddTodoReceived = typeof pseudoAddTodoReceived
export type UpdateTodoRequested = typeof pseudoUpdateTodoRequested
export type UpdateTodoReceived = typeof pseudoUpdateTodoReceived
export type ToggleTodoDoneRequested = typeof pseudoToggleTodoDoneRequested
export type ToggleTodoDoneReceived = typeof pseudoToggleTodoDoneReceived
export type DeleteTodoRequested = typeof pseudoDeleteTodoRequested
export type DeleteTodoReceived = typeof pseudoDeleteTodoReceived
export type ToggleDoneFilter = typeof pseudoToggleDoneFilter
export type SelectOrder = typeof pseudoSelectOrder

export type Action =
  | AddTodoRequested
  | AddTodoReceived
  | UpdateTodoRequested
  | UpdateTodoReceived
  | ToggleTodoDoneRequested
  | ToggleTodoDoneReceived
  | DeleteTodoRequested
  | DeleteTodoReceived
  | ToggleDoneFilter
  | SelectOrder
