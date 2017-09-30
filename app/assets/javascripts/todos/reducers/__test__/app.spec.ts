import 'mocha';
import * as assert from 'assert';
import * as actions from '../../actions'
import appReducer, { AppState, initialState } from '../app';

describe('App reducer', () => {
  describe('ToggleDoneFilter Action', () => {
    it('should toggles doneFilter state', () => {
      const newState = appReducer(initialState, actions.toggleDoneFilter())
      assert(newState.doneFilter !== initialState.doneFilter);
    })
  })

  describe('SelectOrder Action', () => {
    it('should set sortBy and sortOrder state', () => {
      const state: AppState = {
        ...initialState,
        sortBy: 'createdAt',
        sortOrder: 'asc'
      }
      const newState = appReducer(state, actions.selectOrder('dueDate', 'desc'))
      assert(newState.sortBy === 'dueDate');
      assert(newState.sortOrder === 'desc');
    })
  })
})
