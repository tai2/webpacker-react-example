import { combineReducers, Reducer } from 'redux'
import todos, { TodosState } from './todos'
import app, { AppState } from './app'

export interface StoreState {
  readonly todos: TodosState,
  readonly app: AppState,
}

export * from './todos'
export * from './app'
export default combineReducers({ todos, app })
