import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { Request } from '../../reducers'
import { Todo } from '../../types'
import { TodoItem } from '../TodoItem'

function todoItemHelper(
  todo: Todo,
  updateRequest: Request,
  deleteRequest: Request
) {
  return (
    <TodoItem
      id={1}
      todo={todo}
      updateRequest={updateRequest}
      deleteRequest={deleteRequest}
      onCheckboxChange={action('checked')}
      onContentBlur={action('blur from content')}
      onDueDateBlur={action('blur from dueDate')}
      onDestroyClick={action('deleted')}
    />
  )
}

const typicalTodo: Todo = {
  id: 1,
  content: 'something to do',
  done: false,
  dueDate: '2017-09-30T07:32:08.591Z',
  createdAt: '2017-09-30T07:32:08.591Z',
  updatedAt: '2017-09-30T07:32:08.591Z',
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

storiesOf('TodoItem', module)
  .add('typical', () =>
    todoItemHelper(typicalTodo, succeededRequest, succeededRequest)
  )
  .add('while updating', () =>
    todoItemHelper(typicalTodo, loadingRequest, succeededRequest)
  )
  .add('while deleting', () =>
    todoItemHelper(typicalTodo, succeededRequest, loadingRequest)
  )
  .add('updating error', () =>
    todoItemHelper(typicalTodo, errorRequest, succeededRequest)
  )
  .add('deleting error', () =>
    todoItemHelper(typicalTodo, succeededRequest, errorRequest)
  )
