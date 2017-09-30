import 'mocha';
import * as assert from 'assert';
import * as actions from '../../actions'
import appReducer, { AppState, initialState, SINGLETON_ID } from '../app';

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

  describe('AddTodoRequested Action', () => {
    it('should set requesting to true and error to null', () => {
      const newState = appReducer(initialState, actions.addTodoRequested('todo', '2017-09-30T07:32:08.591Z'))
      assert(newState.requests.addTodo[SINGLETON_ID].requesting);
      assert(newState.requests.addTodo[SINGLETON_ID].error === null);
    })
  })
})
