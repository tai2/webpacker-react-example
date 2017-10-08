import * as React from 'react'
import { SortBy, SortOrder } from '../../reducers'

export interface Props {
  sortBy: SortBy
  sortOrder: SortOrder
  doneFilter: boolean
  onOrderChange: (
    ev:
      | React.ChangeEvent<HTMLSelectElement>
      | React.FocusEvent<HTMLSelectElement>
  ) => void
  onDoneFilterChange: () => void
}

export default function TodoConditions({
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
