import { combineReducers } from 'redux'
import todos from './todos'
import app from './app'

export default combineReducers({ todos, app })
