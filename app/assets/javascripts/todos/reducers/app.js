import * as actions from '../actions'

const initialState = {
  doneFilter: false,
  sortBy: 'due_date-desc'
}

function toggleDoneFilter (state) {
  return {
    ...state,
    doneFilter: !state.doneFilter
  }
}

function selectOrder (state, action) {
  return {
    ...state,
    sortBy: action.payload.sortBy
  }
}

export default function appReducer (state = initialState, action) {
  switch (action.type) {
    case actions.TOGGLE_DONE_FILTER:
      return toggleDoneFilter(state)
    case actions.SELECT_ORDER:
      return selectOrder(state, action)
    default:
      return state
  }
}
