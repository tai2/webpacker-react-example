import React from 'react';
import { connect } from 'react-redux';
import { toggleDoneFilter } from '../actions';

function TodoConditions({ doneFilter, onDoneFilterChange }) {
  return (
    <div className="form-inline">
      <div className="form-group">
        <label>done:
          <input type="checkbox" checked={doneFilter} onChange={onDoneFilterChange}/>
        </label>
      </div>
    </div>
  );
}

export default connect(
  (state) => ({
    doneFilter: state.app.doneFilter,
  }),
  (dispatch, ownProps) => ({
    onDoneFilterChange() {
      dispatch(toggleDoneFilter());
    },
  }),
)(TodoConditions);
