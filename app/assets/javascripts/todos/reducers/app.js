import * as actions from '../actions';
import _ from 'lodash';

const initialState = {
  doneFilter: false,
};

function toggleDoneFilter(state) {
  return {
    ...state,
    doneFilter: !state.doneFilter,
  };
}

export default function appReducer(state = initialState, action) {
  switch(action.type) {
  case actions.TOGGLE_DONE_FILTER:
    return toggleDoneFilter(state);
  default:
    return state;
  }
}

