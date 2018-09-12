import * as moment from 'moment'
import * as React from 'react'
import * as DateTime from 'react-datetime/DateTime'
import { Request } from '../../reducers'
import { Todo } from '../../types'

import EditButton from '../EditButton'
import * as styles from './styles.module.scss'

interface ContentProps {
  todo: Todo
  disabled: boolean
  editing: boolean
  onCheckboxChange: () => void
  onEditClick: () => void
  onInputBlur: (ev: React.FocusEvent<HTMLInputElement>, todo: Todo) => void
}
function Content({
  todo,
  disabled,
  editing,
  onCheckboxChange,
  onEditClick,
  onInputBlur,
}: ContentProps) {
  if (editing) {
    return (
      <input
        type="text"
        defaultValue={todo.content}
        autoFocus
        onBlur={ev => onInputBlur(ev, todo)}
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

interface DueDateProps {
  todo: Todo
  disabled: boolean
  editing: boolean
  onEditClick: () => void
  onInputBlur: (
    ev: React.FocusEvent<any> | moment.Moment | string,
    todo: Todo
  ) => void
}
function DueDate({
  todo,
  disabled,
  editing,
  onEditClick,
  onInputBlur,
}: DueDateProps) {
  if (editing) {
    return (
      <DateTime
        defaultValue={new Date(todo.dueDate)}
        inputProps={{ autoFocus: true }}
        onBlur={ev => onInputBlur(ev, todo)}
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
        disabled={disabled}
        onClick={onEditClick}
      />
    </div>
  )
}

export interface Props {
  id: number
  todo: Todo
  contentEditing: boolean
  dueDateEditing: boolean
  updateRequest: Request
  deleteRequest: Request
  onCheckboxChange: () => void
  onContentClick: () => void
  onContentBlur: (ev: React.FocusEvent<HTMLInputElement>, todo: Todo) => void
  onDueDateClick: () => void
  onDueDateBlur: (
    ev: React.FocusEvent<any> | moment.Moment | string,
    todo: Todo
  ) => void
  onDestroyClick: () => void
}

export default function TodoItem({
  todo,
  contentEditing,
  dueDateEditing,
  updateRequest,
  deleteRequest,
  onCheckboxChange,
  onContentClick,
  onContentBlur,
  onDueDateClick,
  onDueDateBlur,
  onDestroyClick,
}: Props) {
  return (
    <tr key={todo.id}>
      <td className={styles.contentCol}>
        <Content
          todo={todo}
          disabled={updateRequest.requesting}
          editing={contentEditing}
          onCheckboxChange={onCheckboxChange}
          onEditClick={onContentClick}
          onInputBlur={onContentBlur}
        />
      </td>
      <td className={styles.dueDateCol}>
        <DueDate
          todo={todo}
          disabled={updateRequest.requesting}
          editing={dueDateEditing}
          onEditClick={onDueDateClick}
          onInputBlur={onDueDateBlur}
        />
      </td>
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
