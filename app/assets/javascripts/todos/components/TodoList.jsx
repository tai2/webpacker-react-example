import React from 'react';
import TodoItem from './TodoItem';

export default function TodoList({ todos }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>content</th>
          <th>due date</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {todos.map(id => <TodoItem key={id} id={id} />)}
      </tbody>
    </table>
  );
}
