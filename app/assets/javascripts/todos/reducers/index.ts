import { combineReducers } from 'redux'
import todos, { TodosState } from './todos'
import app, { AppState } from './app'

export interface StoreState {
  todos: TodosState,
  app: AppState,
}

export default combineReducers({ todos, app })
