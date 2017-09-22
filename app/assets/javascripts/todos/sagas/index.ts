import { takeEvery, takeLatest, call, put, select } from 'redux-saga/effects'
import * as actions from '../actions'
import { StoreState } from '../reducers'
import * as webApi from '../webApi'

function * addTodoRequested (action: actions.AddTodoRequested) {
  try {
    const { content, dueDate } = action.payload
    const response = yield call(webApi.addTodo, content, dueDate, false)
    yield put(actions.addTodoReceived(response))
  } catch (error) {
    yield put(actions.addTodoReceived(error))
  }
}

function * updateTodoRequested (action: actions.UpdateTodoRequested) {
  try {
    const { id, content, dueDate } = action.payload
    const response = yield call(webApi.updateTodo, id, content, dueDate)
    yield put(actions.updateTodoReceived(response))
  } catch (error) {
    yield put(actions.updateTodoReceived(error))
  }
}

function * toggleTodoDoneRequested (action: actions.ToggleTodoDoneRequested) {
  try {
    const { id } = action.payload
    const done = yield select((state: StoreState) => state.todos.byId[id].done)
    const response = yield call(webApi.updateTodo, id, undefined, undefined, !done)
    yield put(actions.toggleTodoDoneReceived(response))
  } catch (error) {
    yield put(actions.toggleTodoDoneReceived(error))
  }
}

function * deleteTodoRequested (action: actions.DeleteTodoRequested) {
  try {
    const { id } = action.payload
    yield call(webApi.deleteTodo, id)
    yield put(actions.deleteTodoReceived(action.payload))
  } catch (error) {
    yield put(actions.deleteTodoReceived(error))
  }
}

export default function * rootSaga () {
  yield takeLatest('ADD_TODO:REQUESTED', addTodoRequested)
  yield takeEvery('UPDATE_TODO:REQUESTED', updateTodoRequested)
  yield takeEvery('TOGGLE_TODO_DONE:REQUESTED', toggleTodoDoneRequested)
  yield takeEvery('DELETE_TODO:REQUESTED', deleteTodoRequested)
}
