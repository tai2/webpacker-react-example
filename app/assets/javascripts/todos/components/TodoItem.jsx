import React from 'react';
import { connect } from 'react-redux';
import { checkTodo, uncheckTodo, deleteTodo } from '../actions';

function TodoItem({ todo, onCheckboxChange, onDestroyClick }) {
  return (
    <tr key={todo.id}>
      <td>
        <input type="checkbox" checked={todo.done} onChange={onCheckboxChange}/>
        {todo.content}
      </td>
      <td>{todo.created_at}</td>
      <td><button className="btn btn-default" onClick={onDestroyClick}>Destroy</button></td>
    </tr>
  );
}

export default connect(
  (state, ownProps) => ({
    todo: state.todoById[ownProps.id],
  }),
  (dispatch, ownProps) => ({
    onCheckboxChange(event) {
      if (event.target.checked) {
        dispatch(checkTodo(ownProps.id));
      } else {
        dispatch(uncheckTodo(ownProps.id));
      }
    },
    onDestroyClick() {
      if (confirm('Are you sure?')) {
        dispatch(deleteTodo(ownProps.id));
      }
    },
  }),
)(TodoItem);
