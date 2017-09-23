import * as classNames from 'classnames'
import * as moment from 'moment'
import * as React from 'react'
import * as DateTime from 'react-datetime'
import { connect, Dispatch } from 'react-redux'
import { addTodoRequested } from '../actions'
import { Action } from '../actions'
import styles from './TodoAddForm.scss'

interface Props {
  onAddTodo: (content: string, dueDate: Date) => void
}

interface State {
  readonly content: string
  readonly dueDate: Date
}

class TodoAddForm extends React.Component<Props, State> {
  constructor() {
    super()
    this.state = {
      content: '',
      dueDate: new Date(),
    }
  }
  public handleAddTodo() {
    this.setState({ content: '', dueDate: new Date() })
    this.props.onAddTodo(this.state.content, this.state.dueDate)
  }
  public handleChangeDueDate(dt: React.ChangeEvent<any> | moment.Moment | string) {
    if (moment.isMoment(dt)) {
      this.setState({ dueDate: dt.toDate() })
    }
  }
  public render() {
    return (
      <div className="form-inline">
        <div className={classNames('form-group', styles.item)}>
          <label>Content:&nbsp;
            <input className={styles.content}
              type="text"
              value={this.state.content}
              onChange={(e) => this.setState({ content: e.target.value })}
            />
          </label>
        </div>
        <div className={classNames('form-group', styles.item)}>
          <label>DueDate:&nbsp;
            <DateTime
              className={styles.dueDate}
              value={this.state.dueDate}
              onChange={(dt) => this.handleChangeDueDate(dt)}
            />
          </label>
        </div>
        <button
          className={classNames('btn btn-default', styles.item)}
          onClick={() => this.handleAddTodo()}
        >Create Todo</button>
      </div>
    )
  }
}

export default connect(
  null,
  (dispatch: Dispatch<Action>) => ({
    onAddTodo(content: string, dueDate: Date) {
      dispatch(addTodoRequested(content, dueDate.toISOString()))
    },
  }),
)(TodoAddForm)
