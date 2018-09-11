import * as moment from 'moment'
import * as React from 'react'
import * as DateTime from 'react-datetime/DateTime'
import { Request } from '../../reducers'
import { Todo } from '../../types'

import EditButton from '../EditButton'
import * as styles from './styles.module.scss'

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

interface ContentProps {
  todo: Todo
  disabled: boolean
  editing: boolean
  onCheckboxChange: () => void
  onEditClick: () => void
  onContentBlur: (ev: React.FocusEvent<HTMLInputElement>) => void
}
function Content({
  todo,
  disabled,
  editing,
  onCheckboxChange,
  onEditClick,
  onContentBlur,
}: ContentProps) {
  if (editing) {
    return (
      <input
        type="text"
        defaultValue={todo.content}
        autoFocus
        onBlur={onContentBlur}
      />
    )
  }

  return (
    <div>
      <label className={styles.contentLabel}>
        <input
          type="checkbox"
          checked={todo.done}
          disabled={disabled}
          onChange={onCheckboxChange}
        />
        {todo.content}
      </label>
      <EditButton
        className={styles.editButton}
        disabled={disabled}
        onClick={onEditClick}
      />
    </div>
  )
}

export default class TodoItem extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
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
    const {
      todo,
      updateRequest,
      deleteRequest,
      onCheckboxChange,
      onDestroyClick,
    } = this.props

    return (
      <tr key={todo.id}>
        <td className={styles.contentCol}>
          <Content
            todo={todo}
            disabled={updateRequest.requesting}
            editing={this.state.contentEditing}
            onCheckboxChange={onCheckboxChange}
            onEditClick={this.handleContentClick}
            onContentBlur={this.handleContentBlur}
          />
        </td>
        <td className={styles.dueDateCol}>{this.renderDueDate()}</td>
        <td>
          <button
            className="btn btn-secondary"
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
