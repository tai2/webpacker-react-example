import { Action, SelectOrder } from '../actions'

export type SortBy = 'dueDate' | 'createdAt'
export type SortOrder = 'asc' | 'desc'

export interface AppState {
  readonly doneFilter: boolean
  readonly sortBy: SortBy
  readonly sortOrder: SortOrder
}

const initialState: AppState = {
  doneFilter: false,
  sortBy: 'dueDate',
  sortOrder: 'desc',
}

function toggleDoneFilter(state: AppState) {
  return {
    ...state,
    doneFilter: !state.doneFilter,
  }
}

function selectOrder(state: AppState, action: SelectOrder) {
  return {
    ...state,
    sortBy: action.payload.sortBy,
    sortOrder: action.payload.sortOrder,
  }
}

export default function appReducer(state: AppState = initialState, action: Action): AppState {
  switch (action.type) {
    case 'TOGGLE_DONE_FILTER':
      return toggleDoneFilter(state)
    case 'SELECT_ORDER':
      return selectOrder(state, action)
    default:
      return state
  }
}
