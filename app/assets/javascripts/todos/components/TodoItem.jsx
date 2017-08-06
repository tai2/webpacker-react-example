import React from 'react';
import { connect } from 'react-redux';
import squareIcon from 'images/square-o.svg';
import checkSquareIcon from 'images/check-square-o.svg';

function TodoItem({ todo }) {
  return (
    <tr key={todo.id}>
      <td>
        <img className="check" src={todo.done ? squareIcon : checkSquareIcon} />
        {todo.content}
      </td>
      <td>{todo.created_at}</td>
    </tr>
  );
}

export default connect(
  (state, ownProps) => ({
    todo: state.todoById[ownProps.id],
  }),
  null,
)(TodoItem);
