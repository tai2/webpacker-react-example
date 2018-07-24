import * as reactIcon from 'images/react.svg'
import * as React from 'react'
import TodoAddForm from '../TodoAddForm'
import TodoConditions from '../TodoConditions'
import TodoList from '../TodoList'
import * as styles from './styles.module.scss'

export interface Props {
  todos: number[]
}

export default function App({ todos }: Props) {
  return (
    <div>
      <img className={styles.logo} src={reactIcon} alt="react icon" />
      <TodoConditions />
      <TodoList todos={todos} />
      <TodoAddForm />
    </div>
  )
}
