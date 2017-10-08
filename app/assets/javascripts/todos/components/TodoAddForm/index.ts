import { connect, Dispatch } from 'react-redux'
import { Action, addTodoRequested } from '../../actions'
import { SINGLETON_ID, StoreState } from '../../reducers'
import TodoAddForm, { Props } from './render'

type StateProps = Pick<Props, 'addTodoRequest'>
type DispatchProps = Pick<Props, 'onAddTodo'>

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
