import * as moment from 'moment'
import { connect, Dispatch } from 'react-redux'
import { compose, withHandlers, withState } from 'recompose'
import { Action, addTodoRequested } from '../../actions'
import { SINGLETON_ID, StoreState } from '../../reducers'
import TodoAddForm, { Props } from './render'

type StateProps = Pick<Props, 'addTodoRequest'>
type DispatchProps = Pick<Props, 'onAddTodo'>

interface StateUpdaters {
  setContent: (value: string) => void
  setDueDate: (value: Date) => void
}

const enhancer = compose<Props, {}>(
  connect<StateProps, DispatchProps>(
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
  ),
  withState('content', 'setContent', ''),
  withState('dueDate', 'setDueDate', new Date()),
  withHandlers<
    StateUpdaters & DispatchProps,
    Pick<Props, 'onAddTodo' | 'onChangeContent' | 'onChangeDueDate'>
  >({
    onAddTodo: props => (content, dueDate) => {
      props.setContent('')
      props.setDueDate(new Date())
      props.onAddTodo(content, dueDate)
    },
    onChangeContent: props => ev => {
      props.setContent(ev.currentTarget.value)
    },
    onChangeDueDate: props => ev => {
      if (moment.isMoment(ev)) {
        props.setDueDate(ev.toDate())
      }
    },
  })
)

export default enhancer(TodoAddForm)
