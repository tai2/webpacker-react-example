import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'
import * as actions from '../actions'
import { SINGLETON_ID, StoreState } from '../reducers'
import { IdentifiableError } from '../types'
import * as webApi from '../webApi'

function* addTodoRequested(action: actions.AddTodoRequested) {
  try {
    const { requestId, item: { content, dueDate } } = action.payload
    const item = yield call(webApi.addTodo, content, dueDate, false)
    yield put(actions.addTodoReceived({ requestId, item }))
  } catch (error) {
    yield put(
      actions.addTodoReceived(
        new IdentifiableError(SINGLETON_ID, error.message)
      )
    )
  }
}

function* updateTodoRequested(action: actions.UpdateTodoRequested) {
  const { requestId, item: { id, content, dueDate } } = action.payload
  try {
    const item = yield call(webApi.updateTodo, id, content, dueDate)
    yield put(actions.updateTodoReceived({ requestId, item }))
  } catch (error) {
    yield put(
      actions.updateTodoReceived(
        new IdentifiableError(requestId, error.message)
      )
    )
  }
}

function* toggleTodoDoneRequested(action: actions.ToggleTodoDoneRequested) {
  const { requestId, item: { id } } = action.payload
  try {
    const done = yield select((state: StoreState) => state.todos.byId[id].done)
    const item = yield call(webApi.updateTodo, id, undefined, undefined, !done)
    yield put(actions.toggleTodoDoneReceived({ requestId, item }))
  } catch (error) {
    yield put(
      actions.toggleTodoDoneReceived(
        new IdentifiableError(requestId, error.message)
      )
    )
  }
}

function* deleteTodoRequested(action: actions.DeleteTodoRequested) {
  const { requestId, item: { id } } = action.payload
  try {
    yield call(webApi.deleteTodo, id)
    yield put(actions.deleteTodoReceived(action.payload))
  } catch (error) {
    yield put(
      actions.deleteTodoReceived(
        new IdentifiableError(requestId, error.message)
      )
    )
  }
}

export default function* rootSaga() {
  yield takeLatest('ADD_TODO:REQUESTED', addTodoRequested)
  yield takeEvery('UPDATE_TODO:REQUESTED', updateTodoRequested)
  yield takeEvery('TOGGLE_TODO_DONE:REQUESTED', toggleTodoDoneRequested)
  yield takeEvery('DELETE_TODO:REQUESTED', deleteTodoRequested)
}
