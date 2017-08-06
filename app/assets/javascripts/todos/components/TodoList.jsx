import React from 'react';
import squareIcon from 'images/square-o.svg';
import checkSquareIcon from 'images/check-square-o.svg';

export default function TodoList({ todos }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>content</th>
          <th>due date</th>
        </tr>
      </thead>
      <tbody>
        {todos.map(todo => (
          <tr key={todo.id}>
            <td>
              <img className="check" src={todo.done ? squareIcon : checkSquareIcon} />
              {todo.content}
            </td>
            <td>{todo.created_at}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
