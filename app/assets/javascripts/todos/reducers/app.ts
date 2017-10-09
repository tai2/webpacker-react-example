import * as _ from 'lodash'
import * as actions from '../actions'

export type SortBy = 'dueDate' | 'createdAt'
export type SortOrder = 'asc' | 'desc'

export interface Request {
  readonly requesting: boolean
  readonly error: Error | null
}

interface RequestTable {
  readonly [id: number]: Request | undefined
}

export const SINGLETON_ID = 0
export interface AppState {
  readonly doneFilter: boolean
  readonly sortBy: SortBy
  readonly sortOrder: SortOrder
  readonly requests: {
    // If a request is for creation, which means id doesn't exist yet, the index of table should be 0.
    // In this case, RequestTable would be a singleton.
    // This convention increases code reuse between reducers below requests.
    readonly addTodo: RequestTable
    readonly updateTodo: RequestTable
    readonly toggleTodoDone: RequestTable
    readonly deleteTodo: RequestTable
  }
}

export const initialAppState: AppState = {
  doneFilter: false,
  sortBy: 'dueDate',
  sortOrder: 'desc',
  requests: {
    addTodo: {},
    updateTodo: {},
    toggleTodoDone: {},
    deleteTodo: {},
  },
}

function toggleDoneFilter(state: AppState) {
  return {
    ...state,
    doneFilter: !state.doneFilter,
  }
}

function selectOrder(state: AppState, action: actions.SelectOrder) {
  return {
    ...state,
    sortBy: action.payload.sortBy,
    sortOrder: action.payload.sortOrder,
  }
}

interface RequestedAction {
  payload: { requestId: number }
}
function handleRequested(
  target: keyof AppState['requests'],
  state: AppState,
  action: RequestedAction
) {
  return {
    ...state,
    requests: {
      ...state.requests,
      [target]: {
        ...state.requests[target],
        [action.payload.requestId]: {
          requesting: true,
          error: null,
        },
      },
    },
  }
}

interface ReceivedAction {
  payload: { requestId: number } | actions.IdentifiableError
}
function handleReceived(
  target: keyof AppState['requests'],
  state: AppState,
  action: ReceivedAction
) {
  let table
  if (action.payload instanceof actions.IdentifiableError) {
    table = {
      ...state.requests[target],
      [action.payload.targetId]: {
        requesting: false,
        error: action.payload,
      },
    }
  } else {
    table = _.omit(state.requests[target], [action.payload.requestId])
  }

  return {
    ...state,
    requests: {
      ...state.requests,
      [target]: table,
    },
  }
}

export default function appReducer(
  state: AppState = initialAppState,
  action: actions.Action
): AppState {
  switch (action.type) {
    case actions.TOGGLE_DONE_FILTER:
      return toggleDoneFilter(state)
    case actions.SELECT_ORDER:
      return selectOrder(state, action)
    case actions.ADD_TODO_REQUESTED:
      return handleRequested('addTodo', state, action)
    case actions.ADD_TODO_RECEIVED:
      return handleReceived('addTodo', state, action)
    case actions.UPDATE_TODO_REQUESTED:
      return handleRequested('updateTodo', state, action)
    case actions.UPDATE_TODO_RECEIVED:
      return handleReceived('updateTodo', state, action)
    case actions.TOGGLE_TODO_DONE_REQUESTED:
      return handleRequested('toggleTodoDone', state, action)
    case actions.TOGGLE_TODO_DONE_RECEIVED:
      return handleReceived('toggleTodoDone', state, action)
    case actions.DELETE_TODO_REQUESTED:
      return handleRequested('deleteTodo', state, action)
    case actions.DELETE_TODO_RECEIVED:
      return handleReceived('deleteTodo', state, action)
    default:
      return state
  }
}
