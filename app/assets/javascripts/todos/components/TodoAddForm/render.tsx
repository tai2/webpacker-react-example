import * as classNames from 'classnames'
import * as moment from 'moment'
import * as React from 'react'
import * as DateTime from 'react-datetime'
import { Request } from '../../reducers'
import * as styles from './styles.module.scss'

export interface Props {
  content: string
  dueDate: Date
  addTodoRequest: Request
  onAddTodo: (content: string, dueDate: Date) => void
  onChangeContent: (ev: React.ChangeEvent<HTMLInputElement>) => void
  onChangeDueDate: (ev: React.ChangeEvent<any> | moment.Moment | string) => void
}

export default function TodoAddForm({
  content,
  dueDate,
  addTodoRequest,
  onAddTodo,
  onChangeContent,
  onChangeDueDate,
}: Props) {
  return (
    <div className="form-inline">
      <div className={classNames('form-group', styles.item)}>
        <label>
          Content:&nbsp;
          <input
            className={styles.content}
            type="text"
            value={content}
            onChange={onChangeContent}
          />
        </label>
      </div>
      <div className={classNames('form-group', styles.item)}>
        <label>
          DueDate:&nbsp;
          <DateTime
            className={styles.dueDate}
            value={dueDate}
            onChange={onChangeDueDate}
          />
        </label>
      </div>
      <button
        className={classNames('btn btn-secondary', styles.item)}
        onClick={() => onAddTodo(content, dueDate)}
        disabled={addTodoRequest.requesting}
      >
        Create Todo
      </button>
      {addTodoRequest.error && (
        <span className={styles.error}>Create Todo Failed</span>
      )}
    </div>
  )
}
