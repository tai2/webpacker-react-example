import * as moment from 'moment'
import { connect, Dispatch } from 'react-redux'
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

export default connect<StateProps, DispatchProps>(
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
)(TodoItem)
