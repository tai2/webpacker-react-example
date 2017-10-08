import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { Action, selectOrder, toggleDoneFilter } from '../actions'
import { SortBy, SortOrder, StoreState } from '../reducers'

interface StateProps {
  sortBy: SortBy
  sortOrder: SortOrder
  doneFilter: boolean
}

interface DispatchProps {
  onOrderChange: (
    ev:
      | React.ChangeEvent<HTMLSelectElement>
      | React.FocusEvent<HTMLSelectElement>,
  ) => void
  onDoneFilterChange: () => void
}

type Props = StateProps & DispatchProps

export function TodoConditions({
  sortBy,
  sortOrder,
  doneFilter,
  onOrderChange,
  onDoneFilterChange,
}: Props) {
  return (
    <div className="form-inline">
      <div className="form-group">
        <label>
          sort by:&nbsp;
          <select
            className="form-control"
            value={`${sortBy}-${sortOrder}`}
            onChange={onOrderChange}
            onBlur={onOrderChange}
          >
            <option value="dueDate-asc">due date(asc)</option>
            <option value="dueDate-desc">due date(desc)</option>
            <option value="createdAt-asc">created at(asc)</option>
            <option value="createdAt-desc">created at(desc)</option>
          </select>
        </label>
      </div>&nbsp;
      <div className="form-group">
        <label>
          done:&nbsp;
          <input
            type="checkbox"
            checked={doneFilter}
            onChange={onDoneFilterChange}
          />
        </label>
      </div>
    </div>
  )
}

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
        | React.FocusEvent<HTMLSelectElement>,
    ) {
      const [prop, order] = ev.currentTarget.value.split('-')
      dispatch(selectOrder(prop as SortBy, order as SortOrder))
    },
    onDoneFilterChange() {
      dispatch(toggleDoneFilter())
    },
  }),
)(TodoConditions)
