import 'mocha';
import * as assert from 'assert';
import appReducer, { initialState } from '../app';

describe('App reducer', () => {
  describe('ToggleDoneFilter Action', () => {
    it('should toggles doneFilter state', () => {
      const newState = appReducer(initialState, { type: 'TOGGLE_DONE_FILTER' })
      assert(newState.doneFilter != initialState.doneFilter);
    })
  })
})
