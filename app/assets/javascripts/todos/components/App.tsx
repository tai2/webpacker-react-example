import * as React from 'react'
import { connect } from 'react-redux'
import reactIcon from 'images/react.svg'
import { visibleTodos, StoreState } from '../reducers'
import TodoList from './TodoList'
import TodoConditions from './TodoConditions'
import TodoAddForm from './TodoAddForm'
import styles from './App.scss'

export interface Props {
  todos: number[],
}

function App ({ todos }: Props) {
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
  ({ todos, app }: StoreState) => ({
    todos: visibleTodos(todos, app.sortBy, app.sortOrder, app.doneFilter)
  }),
  null
)(App)
