import * as moment from 'moment'
import * as React from 'react'
import * as DateTime from 'react-datetime/DateTime'
import { connect, Dispatch } from 'react-redux'
import { Action } from '../actions'
import { StoreState } from '../reducers'
import { Todo } from '../webApi'

import {
  deleteTodoRequested,
  toggleTodoDoneRequested,
  updateTodoRequested,
} from '../actions'

import EditButton from './EditButton'
import styles from './TodoItem.scss'

interface StateProps {
  todo: Todo
}

interface DispatchProps {
  onCheckboxChange: () => void
  onContentBlur: (ev: React.FocusEvent<HTMLInputElement>, todo: Todo) => void
  onDueDateBlur: (ev: React.FocusEvent<any> | moment.Moment | string, todo: Todo) => void
  onDestroyClick: () => void
}

type Props = {
  id: number,
} & StateProps & DispatchProps

interface State {
  readonly contentEditing: boolean
  readonly dueDateEditing: boolean
}

class TodoItem extends React.Component<Props, State> {
  constructor() {
    super()
    this.state = {
      contentEditing: false,
      dueDateEditing: false,
    }
  }
  renderContent() {
    const { todo, onCheckboxChange, onContentBlur } = this.props

    if (this.state.contentEditing) {
      // see https://w3c.github.io/html/sec-forms.html#autofocusing-a-form-control-the-autofocus-attribute
      // I think, this use of autofocuse is not applied to explained situation.
      /* eslint-disable jsx-a11y/no-autofocus */
      return (
        <input
          type="text"
          defaultValue={todo.content}
          autoFocus
          onBlur={(ev) => {
            this.setState({ contentEditing: false })
            onContentBlur(ev, todo)
          }}
        />
      )
      /* eslint-enable jsx-a11y/no-autofocus */
    }

    return (
      <div>
        <label className={styles.contentLabel}>
          <input type="checkbox" checked={todo.done} onChange={onCheckboxChange}/>
          {todo.content}
        </label>
        <EditButton className={styles.editButton} onClick={() => this.setState({ contentEditing: true })} />
      </div>
    )
  }
  renderDueDate() {
    const { todo, onDueDateBlur } = this.props

    if (this.state.dueDateEditing) {
      return (
        <DateTime
          defaultValue={new Date(todo.dueDate)}
          onBlur={(dt) => {
            this.setState({ dueDateEditing: false })
            onDueDateBlur(dt, todo)
          }}
          inputProps={{ autoFocus: true }}
        />
      )
    }

    return (
      <div>
        {moment(todo.dueDate).local().toString()}
        <EditButton className={styles.editButton} onClick={() => this.setState({ dueDateEditing: true })} />
      </div>
    )
  }
  render() {
    const { todo, onDestroyClick } = this.props
    return (
      <tr key={todo.id}>
        <td className={styles.contentCol}>{this.renderContent()}</td>
        <td className={styles.dueDateCol}>{this.renderDueDate()}</td>
        <td><button className="btn btn-default" onClick={onDestroyClick}>Destroy</button></td>
      </tr>
    )
  }
}

export default connect<StateProps, DispatchProps>(
  (state: StoreState, ownProps: Props) => ({
    todo: state.todos.byId[ownProps.id],
  }),
  (dispatch: Dispatch<Action>, ownProps: Props) => ({
    onCheckboxChange() {
      dispatch(toggleTodoDoneRequested(ownProps.id))
    },
    onContentBlur(ev: React.FocusEvent<HTMLInputElement>, todo: Todo) {
      dispatch(updateTodoRequested(ownProps.id, ev.currentTarget.value, todo.dueDate))
    },
    onDueDateBlur(ev: React.FocusEvent<any> | moment.Moment | string, todo: Todo) {
      if (moment.isMoment(ev)) {
        dispatch(updateTodoRequested(ownProps.id, todo.content, ev.toISOString()))
      }
    },
    onDestroyClick() {
      if (confirm('Are you sure?')) {
        dispatch(deleteTodoRequested(ownProps.id))
      }
    },
  }),
)(TodoItem)
