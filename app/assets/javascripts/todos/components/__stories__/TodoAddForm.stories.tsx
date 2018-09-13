import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { Request } from '../../reducers'
import TodoAddForm from '../TodoAddForm/render'

function todoAddFormHelper({ addTodoRequest }: { addTodoRequest: Request }) {
  return (
    <TodoAddForm
      content="todo item"
      dueDate={new Date()}
      addTodoRequest={succeededRequest}
      onAddTodo={action('added')}
      onChangeContent={action('change content')}
      onChangeDueDate={action('change dueDate')}
    />
  )
}

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
  .add('typical', () =>
    todoAddFormHelper({
      addTodoRequest: succeededRequest,
    })
  )
  .add('while adding', () =>
    todoAddFormHelper({
      addTodoRequest: loadingRequest,
    })
  )
  .add('adding error', () =>
    todoAddFormHelper({
      addTodoRequest: errorRequest,
    })
  )
