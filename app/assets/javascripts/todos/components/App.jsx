import React from 'react';
import TodoList from './TodoList';

export default function App({ todos }) {
  return (
    <div>
      <TodoList todos={todos} />
    </div>
  );
}
