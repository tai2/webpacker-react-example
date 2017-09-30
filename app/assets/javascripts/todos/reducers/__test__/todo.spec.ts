import * as assert from 'assert'
import * as _ from 'lodash'
import 'mocha'
import * as actions from '../../actions'
import appReducer, { SINGLETON_ID } from '../app'
import todosReducer, { initialState, TodoState } from '../todos'

function todoItem() {
  return {
    id: 1,
    content: 'todo',
    done: false,
    dueDate: '2017-09-30T07:32:08.591Z',
    createdAt: '2017-09-30T07:32:08.591Z',
    updatedAt: '2017-09-30T07:32:08.591Z',
  }
}

describe('Todo reducer', () => {
  describe('AddTodoReceived Action', () => {
    it('should add an element to ids', () => {
      const newState = todosReducer(initialState, actions.addTodoReceived({
        requestId: SINGLETON_ID,
        item: todoItem(),
      }))
      assert.deepEqual(newState.ids, [1])
    })

    it('should add an element to byId', () => {
      const newState = todosReducer(initialState, actions.addTodoReceived({
        requestId: SINGLETON_ID,
        item: todoItem(),
      }))
      assert.deepEqual(newState.byId, { 1: todoItem() })
    })
  })
})
