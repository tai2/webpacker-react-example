import { SINGLETON_ID, SortBy, SortOrder } from '../reducers/app'
import { Todo } from '../webApi'

interface FluxActionMinimal<T> {
  type: T
}

interface FluxActionWithPayload<T, P> {
  type: T
  payload: P
}

interface FluxActionResult<T, P, E = Error> {
  type: T
  payload: P | E
}

interface Request<T> {
  requestId: number
  item: T
}

export class IdentifiableError extends Error {
  constructor(readonly targetId: number, message?: string) {
    super(message)
    Object.setPrototypeOf(this, new.target.prototype)
    this.name = 'IdentifiableError'
  }
}

export type AddTodoRequested = FluxActionWithPayload<
  'ADD_TODO:REQUESTED',
  Request<{
    content: string
    dueDate: string
  }>
>
export type AddTodoReceived = FluxActionResult<
  'ADD_TODO:RECEIVED',
  Request<Todo>,
  IdentifiableError
>

export type UpdateTodoRequested = FluxActionWithPayload<
  'UPDATE_TODO:REQUESTED',
  Request<{
    id: number
    content: string
    dueDate: string
  }>
>
export type UpdateTodoReceived = FluxActionResult<
  'UPDATE_TODO:RECEIVED',
  Request<Todo>,
  IdentifiableError
>

export type ToggleTodoDoneRequested = FluxActionWithPayload<
  'TOGGLE_TODO_DONE:REQUESTED',
  Request<{ id: number }>
>
export type ToggleTodoDoneReceived = FluxActionResult<
  'TOGGLE_TODO_DONE:RECEIVED',
  Request<Todo>,
  IdentifiableError
>

export type DeleteTodoRequested = FluxActionWithPayload<
  'DELETE_TODO:REQUESTED',
  Request<{ id: number }>
>
export type DeleteTodoReceived = FluxActionResult<
  'DELETE_TODO:RECEIVED',
  Request<{ id: number }>,
  IdentifiableError
>

export type ToggleDoneFilter = FluxActionMinimal<'TOGGLE_DONE_FILTER'>

export type SelectOrder = FluxActionWithPayload<
  'SELECT_ORDER',
  { sortBy: SortBy; sortOrder: SortOrder }
>

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

export function addTodoRequested(
  content: string,
  dueDate: string,
): AddTodoRequested {
  return {
    type: 'ADD_TODO:REQUESTED',
    payload: {
      requestId: SINGLETON_ID,
      item: { content, dueDate },
    },
  }
}

export function addTodoReceived(
  payload: Request<Todo> | IdentifiableError,
): AddTodoReceived {
  return {
    type: 'ADD_TODO:RECEIVED',
    payload,
  }
}

export function updateTodoRequested(
  id: number,
  content: string,
  dueDate: string,
): UpdateTodoRequested {
  return {
    type: 'UPDATE_TODO:REQUESTED',
    payload: {
      requestId: id,
      item: { id, content, dueDate },
    },
  }
}

export function updateTodoReceived(
  payload: Request<Todo> | IdentifiableError,
): UpdateTodoReceived {
  return {
    type: 'UPDATE_TODO:RECEIVED',
    payload,
  }
}

export function toggleTodoDoneRequested(id: number): ToggleTodoDoneRequested {
  return {
    type: 'TOGGLE_TODO_DONE:REQUESTED',
    payload: {
      requestId: id,
      item: { id },
    },
  }
}

export function toggleTodoDoneReceived(
  payload: Request<Todo> | IdentifiableError,
): ToggleTodoDoneReceived {
  return {
    type: 'TOGGLE_TODO_DONE:RECEIVED',
    payload,
  }
}

export function deleteTodoRequested(id: number): DeleteTodoRequested {
  return {
    type: 'DELETE_TODO:REQUESTED',
    payload: {
      requestId: id,
      item: { id },
    },
  }
}

export function deleteTodoReceived(
  payload: Request<{ id: number }> | IdentifiableError,
): DeleteTodoReceived {
  return {
    type: 'DELETE_TODO:RECEIVED',
    payload,
  }
}

export function toggleDoneFilter(): ToggleDoneFilter {
  return {
    type: 'TOGGLE_DONE_FILTER',
  }
}

export function selectOrder(sortBy: SortBy, sortOrder: SortOrder): SelectOrder {
  return {
    type: 'SELECT_ORDER',
    payload: { sortBy, sortOrder },
  }
}
