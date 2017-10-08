import { connect, Dispatch } from 'react-redux'
import { Action, selectOrder, toggleDoneFilter } from '../../actions'
import { SortBy, SortOrder, StoreState } from '../../reducers'
import TodoConditions, { Props } from './render'

type StateProps = Pick<Props, 'sortBy' | 'sortOrder' | 'doneFilter'>
type DispatchProps = Pick<Props, 'onOrderChange' | 'onDoneFilterChange'>

export default connect<StateProps, DispatchProps>(
  (state: StoreState) => ({
    sortBy: state.app.sortBy,
    sortOrder: state.app.sortOrder,
    doneFilter: state.app.doneFilter,
  }),
  (dispatch: Dispatch<Action>) => ({
    onOrderChange(
      ev:
        | React.ChangeEvent<HTMLSelectElement>
        | React.FocusEvent<HTMLSelectElement>
    ) {
      const [prop, order] = ev.currentTarget.value.split('-')
      dispatch(selectOrder(prop as SortBy, order as SortOrder))
    },
    onDoneFilterChange() {
      dispatch(toggleDoneFilter())
    },
  })
)(TodoConditions)
