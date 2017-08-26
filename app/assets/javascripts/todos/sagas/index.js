import { takeEvery, takeLatest, call, put, select } from 'redux-saga/effects'
import * as actions from '../actions'
import * as webApi from '../webApi'

function * addTodoRequested (action) {
  try {
    const { content, dueDate } = action.payload
    const response = yield call(webApi.addTodo, content, dueDate, false)
    yield put(actions.addTodoReceived(response))
  } catch (error) {
    yield put(actions.addTodoReceived(error))
  }
}

function * updateTodoRequested (action) {
  try {
    const { id, content, dueDate } = action.payload
    const response = yield call(webApi.updateTodo, id, content, dueDate)
    yield put(actions.updateTodoReceived(response))
  } catch (error) {
    yield put(actions.updateTodoReceived(error))
  }
}

function * toggleTodoDoneRequested (action) {
  try {
    const { id } = action.payload
    const done = yield select(state => state.todos.byId[id].done)
    const response = yield call(webApi.updateTodo, id, undefined, undefined, !done)
    yield put(actions.toggleTodoDoneReceived(response))
  } catch (error) {
    yield put(actions.toggleTodoDoneReceived(error))
  }
}

function * deleteTodoRequested (action) {
  try {
    const { id } = action.payload
    yield call(webApi.deleteTodo, id)
    yield put(actions.deleteTodoReceived(action.payload))
  } catch (error) {
    yield put(actions.deleteTodoReceived(error))
  }
}

export default function * rootSaga () {
  yield takeLatest(actions.ADD_TODO_REQUESTED, addTodoRequested)
  yield takeEvery(actions.UPDATE_TODO_REQUESTED, updateTodoRequested)
  yield takeEvery(actions.TOGGLE_TODO_DONE_REQUESTED, toggleTodoDoneRequested)
  yield takeEvery(actions.DELETE_TODO_REQUESTED, deleteTodoRequested)
}
