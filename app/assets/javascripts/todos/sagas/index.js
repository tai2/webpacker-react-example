import { takeEvery, takeLatest, call, put } from 'redux-saga/effects';
import * as actions from '../actions';
import * as webApi from '../webApi';

function* addTodoRequested(action) {
  try {
    const { content, dueDate } = action.payload;
    const response = yield call(webApi.addTodo, content, dueDate, false);
    yield put(actions.addTodoReceived(response));
  } catch (error) {
    yield put(actions.addTodoReceived(error));
  }
}

export default function* rootSaga() {
  yield takeLatest(actions.ADD_TODO_REQUESTED, addTodoRequested);
}

