import * as _ from 'lodash'
import * as actions from '../actions'

export type SortBy = 'dueDate' | 'createdAt'
export type SortOrder = 'asc' | 'desc'

export interface Request {
  requesting: boolean
  error: Error | null
}

export interface AppState {
  readonly doneFilter: boolean
  readonly sortBy: SortBy
  readonly sortOrder: SortOrder
  readonly requests: {
    addTodo: Request,
    updateTodo: {
      [id: number]: Request | undefined,
    },
    toggleTodoDone: {
      [id: number]: Request | undefined,
    },
  }
}

const initialState: AppState = {
  doneFilter: false,
  sortBy: 'dueDate',
  sortOrder: 'desc',
  requests: {
    addTodo: {
      requesting: false,
      error: null,
    },
    updateTodo: {},
    toggleTodoDone: {},
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

function addTodoRequested(state: AppState, action: actions.AddTodoRequested) {
  return {
    ...state,
    requests: {
      ...state.requests,
      addTodo: {
        requesting: true,
        error: null,
      },
    },
  }
}

function addTodoReceived(state: AppState, action: actions.AddTodoReceived) {
  return {
    ...state,
    requests: {
      ...state.requests,
      addTodo: {
        requesting: false,
        error: action.payload instanceof Error ? action.payload : null,
      },
    },
  }
}

function updateTodoRequested(state: AppState, action: actions.UpdateTodoRequested) {
  return {
    ...state,
    requests: {
      ...state.requests,
      updateTodo: {
        ...state.requests.updateTodo,
        [action.payload.id]: {
          requesting: true,
          error: null,
        },
      },
    },
  }
}

function updateTodoReceived(state: AppState, action: actions.UpdateTodoReceived) {
  let updateTodo
  if (action.payload instanceof actions.IdentifiableError) {
    updateTodo = {
      ...state.requests.updateTodo,
      [action.payload.targetId]: {
        requesting: false,
        error: action.payload,
      },
    }
  } else {
    updateTodo = _.omit(state.requests.updateTodo, [action.payload.id])
  }

  return {
    ...state,
    requests: {
      ...state.requests,
      updateTodo,
    },
  }
}

function toggleTodoDoneRequested(state: AppState, action: actions.ToggleTodoDoneRequested) {
  return {
    ...state,
    requests: {
      ...state.requests,
      toggleTodoDone: {
        ...state.requests.toggleTodoDone,
        [action.payload.id]: {
          requesting: true,
          error: null,
        },
      },
    },
  }
}

function toggleTodoDoneReceived(state: AppState, action: actions.ToggleTodoDoneReceived) {
  let toggleTodoDone
  if (action.payload instanceof actions.IdentifiableError) {
    toggleTodoDone = {
      ...state.requests.toggleTodoDone,
      [action.payload.targetId]: {
        requesting: false,
        error: action.payload,
      },
    }
  } else {
    toggleTodoDone = _.omit(state.requests.toggleTodoDone, [action.payload.id])
  }

  return {
    ...state,
    requests: {
      ...state.requests,
      toggleTodoDone,
    },
  }
}

export default function appReducer(state: AppState = initialState, action: actions.Action): AppState {
  switch (action.type) {
    case 'TOGGLE_DONE_FILTER':
      return toggleDoneFilter(state)
    case 'SELECT_ORDER':
      return selectOrder(state, action)
    case 'ADD_TODO:REQUESTED':
      return addTodoRequested(state, action)
    case 'ADD_TODO:RECEIVED':
      return addTodoReceived(state, action)
    case 'UPDATE_TODO:REQUESTED':
      return updateTodoRequested(state, action)
    case 'UPDATE_TODO:RECEIVED':
      return updateTodoReceived(state, action)
    case 'TOGGLE_TODO_DONE:REQUESTED':
      return toggleTodoDoneRequested(state, action)
    case 'TOGGLE_TODO_DONE:RECEIVED':
      return toggleTodoDoneReceived(state, action)
    default:
      return state
  }
}
