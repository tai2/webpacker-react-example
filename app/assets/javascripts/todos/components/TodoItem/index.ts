import * as moment from 'moment'
import { connect, Dispatch } from 'react-redux'
import { compose, withHandlers, withState } from 'recompose'
import { StoreState } from '../../reducers'
import { Todo } from '../../types'

import {
  Action,
  deleteTodoRequested,
  toggleTodoDoneRequested,
  updateTodoRequested,
} from '../../actions'

import TodoItem, { Props } from './render'

type OwnProps = Pick<Props, 'id'>
type StateProps = Pick<Props, 'todo' | 'updateRequest' | 'deleteRequest'>
type DispatchProps = Pick<
  Props,
  'onCheckboxChange' | 'onContentBlur' | 'onDueDateBlur' | 'onDestroyClick'
>

interface StateUpdaters {
  setContentEditing: (value: boolean) => void
  setDueDateEditing: (value: boolean) => void
}

const enhancer = compose<Props, OwnProps>(
  connect<StateProps, DispatchProps>(
    (state: StoreState, ownProps: OwnProps) => ({
      todo: state.todos.byId[ownProps.id],
      updateRequest: state.app.requests.updateTodo[ownProps.id] ||
        state.app.requests.toggleTodoDone[ownProps.id] || {
          requesting: false,
          error: null,
        },
      deleteRequest: state.app.requests.deleteTodo[ownProps.id] || {
        requesting: false,
        error: null,
      },
    }),
    (dispatch: Dispatch<Action>, ownProps: OwnProps) => ({
      onCheckboxChange() {
        dispatch(toggleTodoDoneRequested(ownProps.id))
      },
      onContentBlur(ev: React.FocusEvent<HTMLInputElement>, todo: Todo) {
        dispatch(
          updateTodoRequested(ownProps.id, ev.currentTarget.value, todo.dueDate)
        )
      },
      onDueDateBlur(
        ev: React.FocusEvent<any> | moment.Moment | string,
        todo: Todo
      ) {
        if (moment.isMoment(ev)) {
          dispatch(
            updateTodoRequested(ownProps.id, todo.content, ev.toISOString())
          )
        }
      },
      onDestroyClick() {
        if (confirm('Are you sure?')) {
          dispatch(deleteTodoRequested(ownProps.id))
        }
      },
    })
  ),
  withState('contentEditing', 'setContentEditing', false),
  withState('dueDateEditing', 'setDueDateEditing', false),
  withHandlers<
    StateUpdaters & DispatchProps,
    Pick<
      Props,
      'onContentClick' | 'onContentBlur' | 'onDueDateClick' | 'onDueDateBlur'
    >
  >({
    onContentClick: props => () => {
      props.setContentEditing(true)
    },
    onContentBlur: props => (event, todo) => {
      props.setContentEditing(false)
      props.onContentBlur(event, todo)
    },
    onDueDateClick: props => () => {
      props.setDueDateEditing(true)
    },
    onDueDateBlur: props => (event, todo) => {
      props.setDueDateEditing(false)
      props.onDueDateBlur(event, todo)
    },
  })
)

export default enhancer(TodoItem)
