import reactIcon from 'images/react.svg'
import * as React from 'react'
import { connect } from 'react-redux'
import { StoreState, visibleTodos } from '../reducers'
import styles from './App.scss'
import TodoAddForm from './TodoAddForm'
import TodoConditions from './TodoConditions'
import TodoList from './TodoList'

export interface Props {
  todos: number[]
}

function App({ todos }: Props) {
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
    todos: visibleTodos(todos, app.sortBy, app.sortOrder, app.doneFilter),
  }),
  null,
)(App)
