import React from 'react'
import { connect } from 'react-redux'
import reactIcon from 'images/react.svg'
import { visibleTodos } from '../reducers/todos'
import TodoList from './TodoList'
import TodoConditions from './TodoConditions'
import TodoAddForm from './TodoAddForm'
import styles from './App.scss'

function App ({ todos }) {
  return (
    <div>
      <img className={styles.logo} src={reactIcon} alt="react icon" />
      <TodoConditions />
      <TodoList todos={todos} />
      <TodoAddForm />
    </div>
  )
}

export default connect(
  (state) => ({
    todos: visibleTodos(state.todos, state.app.sortBy, state.app.doneFilter)
  }),
  null
)(App)
