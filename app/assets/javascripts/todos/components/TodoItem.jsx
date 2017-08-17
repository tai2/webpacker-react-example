import React from 'react';
import { connect } from 'react-redux';
import { deleteTodo } from '../actions';
import squareIcon from 'images/square-o.svg';
import checkSquareIcon from 'images/check-square-o.svg';

function TodoItem({ todo, onDestroyClick }) {
  return (
    <tr key={todo.id}>
      <td>
        <img className="check" src={todo.done ? squareIcon : checkSquareIcon} />
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
    onDestroyClick() {
      if (confirm('Are you sure?')) {
        dispatch(deleteTodo(ownProps.id));
      }
    },
  }),
)(TodoItem);
