import * as classNames from 'classnames'
import * as moment from 'moment'
import * as React from 'react'
import * as DateTime from 'react-datetime'
import { connect, Dispatch } from 'react-redux'
import { Action, addTodoRequested } from '../actions'
import { Request, SINGLETON_ID, StoreState } from '../reducers'
import * as styles from './TodoAddForm.scss'

interface StateProps {
  addTodoRequest: Request
}

interface DispatchProps {
  onAddTodo: (content: string, dueDate: Date) => void
}

type Props = StateProps & DispatchProps

interface State {
  readonly content: string
  readonly dueDate: Date
}

export class TodoAddForm extends React.Component<Props, State> {
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

export default connect<StateProps, DispatchProps>(
  ({ app: { requests } }: StoreState) => ({
    addTodoRequest: requests.addTodo[SINGLETON_ID] || {
      requesting: false,
      error: null,
    },
  }),
  (dispatch: Dispatch<Action>) => ({
    onAddTodo(content: string, dueDate: Date) {
      dispatch(addTodoRequested(content, dueDate.toISOString()))
    },
  })
)(TodoAddForm)
