import React, { Component }  from 'react';
import { connect } from 'react-redux';
import {
  checkTodo,
  uncheckTodo,
  updateTodo,
  deleteTodo
} from '../actions';
import styles from './TodoItem.scss';

class TodoItem extends Component {
  constructor() {
    super();
    this.state = {
      contentEditing: false,
      dueDateEditing: false,
    };
  }
  renderContent() {
    const { todo, onInputBlur } = this.props;

    if (this.state.contentEditing) {
      return (
        <input
          type="text"
          defaultValue={todo.content}
          autoFocus
          onBlur={(ev) => {
            this.setState({ contentEditing: false });
            onInputBlur(ev, todo);
          }}
        />
      );
    }

    return todo.content;
  }
  render() {
    const { todo, onCheckboxChange, onDestroyClick } = this.props;
    return (
      <tr key={todo.id}>
        <td className={styles.contentCol} onClick={() => this.setState({ contentEditing: true })}>
          <input type="checkbox" checked={todo.done} onChange={onCheckboxChange}/>
          {this.renderContent()}
        </td>
        <td>{todo.created_at}</td>
        <td><button className="btn btn-default" onClick={onDestroyClick}>Destroy</button></td>
      </tr>
    );
  }
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
    onInputBlur(event, todo) {
        dispatch(updateTodo(ownProps.id, event.target.value, todo.dueDate));
    },
    onDestroyClick() {
      if (confirm('Are you sure?')) {
        dispatch(deleteTodo(ownProps.id));
      }
    },
  }),
)(TodoItem);
