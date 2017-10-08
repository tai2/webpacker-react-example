import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { Request } from '../../reducers'
import { TodoAddForm } from '../TodoAddForm'

const succeededRequest: Request = {
  requesting: false,
  error: null,
}

const errorRequest: Request = {
  requesting: false,
  error: new Error('error'),
}

const loadingRequest: Request = {
  requesting: true,
  error: null,
}

storiesOf('TodoAddForm', module)
  .add('typical', () => <TodoAddForm addTodoRequest={succeededRequest} onAddTodo={action('added')}/>)
  .add('while adding', () => <TodoAddForm addTodoRequest={loadingRequest} onAddTodo={action('added')}/>)
  .add('adding error', () => <TodoAddForm addTodoRequest={errorRequest} onAddTodo={action('added')}/>)
