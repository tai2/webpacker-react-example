import * as classNames from 'classnames'
import * as moment from 'moment'
import * as React from 'react'
import * as DateTime from 'react-datetime'
import { Request } from '../../reducers'
import * as styles from './styles.scss'

export interface Props {
  addTodoRequest: Request
  onAddTodo: (content: string, dueDate: Date) => void
}

interface State {
  readonly content: string
  readonly dueDate: Date
}

export default class TodoAddForm extends React.Component<Props, State> {
  constructor() {
    super()
    this.state = {
      content: '',
      dueDate: new Date(),
    }
  }
  handleAddTodo = () => {
    this.setState({ content: '', dueDate: new Date() })
    this.props.onAddTodo(this.state.content, this.state.dueDate)
  }
  handleChangeContent = (ev: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ content: ev.currentTarget.value })
  }
  handleChangeDueDate = (
    dt: React.ChangeEvent<any> | moment.Moment | string
  ) => {
    if (moment.isMoment(dt)) {
      this.setState({ dueDate: dt.toDate() })
    }
  }
  render() {
    const { addTodoRequest } = this.props

    return (
      <div className="form-inline">
        <div className={classNames('form-group', styles.item)}>
          <label>
            Content:&nbsp;
            <input
              className={styles.content}
              type="text"
              value={this.state.content}
              onChange={this.handleChangeContent}
            />
          </label>
        </div>
        <div className={classNames('form-group', styles.item)}>
          <label>
            DueDate:&nbsp;
            <DateTime
              className={styles.dueDate}
              value={this.state.dueDate}
              onChange={this.handleChangeDueDate}
            />
          </label>
        </div>
        <button
          className={classNames('btn btn-default', styles.item)}
          onClick={this.handleAddTodo}
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
}
