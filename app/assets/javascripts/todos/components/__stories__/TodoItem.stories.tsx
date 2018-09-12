import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { Request } from '../../reducers'
import { Todo } from '../../types'
import TodoItem from '../TodoItem/render'

function todoItemHelper(
  todo: Todo,
  {
    updateRequest,
    deleteRequest,
    contentEditing = false,
    dueDateEditing = false,
  }: {
    updateRequest: Request
    deleteRequest: Request
    contentEditing?: boolean
    dueDateEditing?: boolean
  }
) {
  return (
    <TodoItem
      id={1}
      todo={todo}
      contentEditing={contentEditing}
      dueDateEditing={dueDateEditing}
      updateRequest={updateRequest}
      deleteRequest={deleteRequest}
      onCheckboxChange={action('checked')}
      onContentClick={action('click content')}
      onContentBlur={action('blur from content')}
      onDueDateClick={action('click dueDate')}
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
    todoItemHelper(typicalTodo, {
      updateRequest: succeededRequest,
      deleteRequest: succeededRequest,
    })
  )
  .add('while updating', () =>
    todoItemHelper(typicalTodo, {
      updateRequest: loadingRequest,
      deleteRequest: succeededRequest,
    })
  )
  .add('while deleting', () =>
    todoItemHelper(typicalTodo, {
      updateRequest: succeededRequest,
      deleteRequest: loadingRequest,
    })
  )
  .add('updating error', () =>
    todoItemHelper(typicalTodo, {
      updateRequest: errorRequest,
      deleteRequest: succeededRequest,
    })
  )
  .add('deleting error', () =>
    todoItemHelper(typicalTodo, {
      updateRequest: succeededRequest,
      deleteRequest: errorRequest,
    })
  )
  .add('content editing', () =>
    todoItemHelper(typicalTodo, {
      updateRequest: succeededRequest,
      deleteRequest: succeededRequest,
      contentEditing: true,
    })
  )
  .add('dueDate editing', () =>
    todoItemHelper(typicalTodo, {
      updateRequest: succeededRequest,
      deleteRequest: succeededRequest,
      dueDateEditing: true,
    })
  )
