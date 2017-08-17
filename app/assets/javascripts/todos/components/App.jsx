import React from 'react';
import { connect } from 'react-redux';
import reactIcon from 'images/react.svg';
import TodoList from './TodoList';
import styles from './App.scss';

function App({ todos }) {
  return (
    <div>
      <img className={styles.logo} src={reactIcon} />
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
