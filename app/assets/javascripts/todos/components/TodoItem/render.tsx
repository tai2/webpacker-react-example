import * as moment from 'moment'
import * as React from 'react'
import * as DateTime from 'react-datetime/DateTime'
import { Request } from '../../reducers'
import { Todo } from '../../types'

import EditButton from '../EditButton'
import * as styles from './styles.scss'

export interface Props {
  id: number
  todo: Todo
  updateRequest: Request
  deleteRequest: Request
  onCheckboxChange: () => void
  onContentBlur: (ev: React.FocusEvent<HTMLInputElement>, todo: Todo) => void
  onDueDateBlur: (
    ev: React.FocusEvent<any> | moment.Moment | string,
    todo: Todo
  ) => void
  onDestroyClick: () => void
}

interface State {
  readonly contentEditing: boolean
  readonly dueDateEditing: boolean
}

export default class TodoItem extends React.Component<Props, State> {
  constructor() {
    super()
    this.state = {
      contentEditing: false,
      dueDateEditing: false,
    }
  }
  handleContentClick = () => {
    this.setState({ contentEditing: true })
  }
  handleContentBlur = (ev: React.FocusEvent<HTMLInputElement>) => {
    this.setState({ contentEditing: false })
    this.props.onContentBlur(ev, this.props.todo)
  }
  handleDueDateClick = () => {
    this.setState({ dueDateEditing: true })
  }
  handleDueDateBlur = (ev: React.FocusEvent<any> | moment.Moment | string) => {
    this.setState({ dueDateEditing: false })
    this.props.onDueDateBlur(ev, this.props.todo)
  }
  renderContent() {
    const { todo, updateRequest, onCheckboxChange } = this.props

    if (this.state.contentEditing) {
      return (
        <input
          type="text"
          defaultValue={todo.content}
          autoFocus
          onBlur={this.handleContentBlur}
        />
      )
    }

    return (
      <div>
        <label className={styles.contentLabel}>
          <input
            type="checkbox"
            checked={todo.done}
            disabled={updateRequest.requesting}
            onChange={onCheckboxChange}
          />
          {todo.content}
        </label>
        <EditButton
          className={styles.editButton}
          disabled={updateRequest.requesting}
          onClick={this.handleContentClick}
        />
      </div>
    )
  }
  renderDueDate() {
    const { todo, updateRequest } = this.props

    if (this.state.dueDateEditing) {
      return (
        <DateTime
          defaultValue={new Date(todo.dueDate)}
          inputProps={{ autoFocus: true }}
          onBlur={this.handleDueDateBlur}
        />
      )
    }

    return (
      <div>
        {moment(todo.dueDate)
          .local()
          .toString()}
        <EditButton
          className={styles.editButton}
          disabled={updateRequest.requesting}
          onClick={this.handleDueDateClick}
        />
      </div>
    )
  }
  render() {
    const { todo, updateRequest, deleteRequest, onDestroyClick } = this.props
    return (
      <tr key={todo.id}>
        <td className={styles.contentCol}>{this.renderContent()}</td>
        <td className={styles.dueDateCol}>{this.renderDueDate()}</td>
        <td>
          <button
            className="btn btn-default"
            disabled={deleteRequest.requesting}
            onClick={onDestroyClick}
          >
            Destroy
          </button>

          {updateRequest.error && (
            <span className={styles.error}>Update todo failed</span>
          )}
          {deleteRequest.error && (
            <span className={styles.error}>Delete todo failed</span>
          )}
        </td>
      </tr>
    )
  }
}
