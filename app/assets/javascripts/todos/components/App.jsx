import React from 'react';
import { connect } from 'react-redux';
import reactIcon from 'images/react.svg';
import TodoList from './TodoList';
import TodoAddForm from './TodoAddForm';
import styles from './App.scss';

function App({ todos }) {
  return (
    <div>
      <img className={styles.logo} src={reactIcon} />
      <TodoList todos={todos} />
      <TodoAddForm />
    </div>
  );
}

export default connect(
  (state) => ({
    todos: state.todos,
  }),
  null,
)(App);
