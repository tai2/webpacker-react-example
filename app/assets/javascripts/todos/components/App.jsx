import React from 'react';
import { connect } from 'react-redux';
import TodoList from './TodoList';

function App({ todos }) {
  return (
    <div>
      <TodoList todos={todos} />
    </div>
  );
}

export default connect(
  (state) => ({
    todos: state.todos,
  }),
  null,
)(App);
