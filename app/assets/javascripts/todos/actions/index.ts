import { Todo } from '../webApi'

type FluxActionMinimal<T> = {
  type: T,
}

type FluxActionWithPayload<T, P> = FluxActionMinimal<T> & {
  payload: P,
}

type FluxActionResult<T, P> = FluxActionMinimal<T> & {
  payload: P | Error,
  error: boolean,
}

export type AddTodoRequested = FluxActionWithPayload<'ADD_TODO:REQUESTED', {
  content: string,
  dueDate: string,
}>
export type AddTodoReceived = FluxActionResult<'ADD_TODO:RECEIVED', Todo>

export type UpdateTodoRequested = FluxActionWithPayload<'UPDATE_TODO:REQUESTED', {
  id: number,
  content: string,
  dueDate: string,
}>
export type UpdateTodoReceived = FluxActionResult<'UPDATE_TODO:RECEIVED', Todo>;

export type ToggleTodoDoneRequested = FluxActionWithPayload<'TOGGLE_TODO_DONE:REQUESTED', {
  id: number,
}>
export type ToggleTodoDoneReceived = FluxActionResult<'TOGGLE_TODO_DONE:RECEIVED', Todo>;

export type DeleteTodoRequested = FluxActionWithPayload<'DELETE_TODO:REQUESTED', {
  id: number,
}>
export type DeleteTodoReceived = FluxActionResult<'DELETE_TODO:RECEIVED', { id: number }>

export type ToggleDoneFilter = FluxActionMinimal<'TOGGLE_DONE_FILTER'>

export type SelectOrder = FluxActionWithPayload<'SELECT_ORDER', { sortBy: string }>

export type Action =
    AddTodoRequested
  | AddTodoReceived
  | UpdateTodoRequested
  | UpdateTodoReceived
  | ToggleTodoDoneRequested
  | ToggleTodoDoneReceived
  | DeleteTodoRequested
  | DeleteTodoReceived
  | ToggleDoneFilter
  | SelectOrder

export function addTodoRequested (content: string, dueDate: string): AddTodoRequested {
  return {
    type: 'ADD_TODO:REQUESTED',
    payload: { content, dueDate }
  }
}

export function addTodoReceived (payload: Todo | Error): AddTodoReceived {
  return {
    type: 'ADD_TODO:RECEIVED',
    payload: payload,
    error: payload instanceof Error
  }
}

export function updateTodoRequested (id: number, content: string, dueDate: string): UpdateTodoRequested {
  return {
    type: 'UPDATE_TODO:REQUESTED',
    payload: { id, content, dueDate }
  }
}

export function updateTodoReceived (payload: Todo | Error): UpdateTodoReceived {
  return {
    type: 'UPDATE_TODO:RECEIVED',
    payload: payload,
    error: payload instanceof Error
  }
}

export function toggleTodoDoneRequested (id: number): ToggleTodoDoneRequested {
  return {
    type: 'TOGGLE_TODO_DONE:REQUESTED',
    payload: { id }
  }
}

export function toggleTodoDoneReceived (payload: Todo | Error): ToggleTodoDoneReceived {
  return {
    type: 'TOGGLE_TODO_DONE:RECEIVED',
    payload: payload,
    error: payload instanceof Error
  }
}

export function deleteTodoRequested (id: number): DeleteTodoRequested {
  return {
    type: 'DELETE_TODO:REQUESTED',
    payload: { id }
  }
}

export function deleteTodoReceived (payload: { id: number } | Error): DeleteTodoReceived {
  return {
    type: 'DELETE_TODO:RECEIVED',
    payload: payload,
    error: payload instanceof Error
  }
}

export function toggleDoneFilter (): ToggleDoneFilter {
  return {
    type: 'TOGGLE_DONE_FILTER',
  }
}

export function selectOrder (sortBy: string): SelectOrder {
  return {
    type: 'SELECT_ORDER',
    payload: { sortBy }
  }
}
