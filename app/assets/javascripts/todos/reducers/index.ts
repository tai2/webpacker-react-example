import { combineReducers, Reducer } from 'redux'
import app, { AppState } from './app'
import todos, { TodosState } from './todos'

export interface StoreState {
  readonly todos: TodosState
  readonly app: AppState
}

export * from './todos'
export * from './app'
export default combineReducers({ todos, app })
