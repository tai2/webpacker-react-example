import React, { Component }  from 'react';
import { connect } from 'react-redux';
import DateTime from 'react-datetime/DateTime';
import moment from 'moment';
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
    const { todo, onContentBlur } = this.props;

    if (this.state.contentEditing) {
      return (
        <input
          type="text"
          defaultValue={todo.content}
          autoFocus
          onBlur={(ev) => {
            this.setState({ contentEditing: false });
            onContentBlur(ev, todo);
          }}
        />
      );
    }

    return todo.content;
  }
  renderDueDate() {
    const { todo, onDueDateBlur } = this.props;

    if (this.state.dueDateEditing) {
      return (
        <DateTime
          defaultValue={new Date(todo.due_date)}
          onBlur={(dt) => {
            this.setState({ dueDateEditing: false });
            onDueDateBlur(dt, todo);
          }}
          inputProps={{ autoFocus: true }}
        />
      );
    }

    return moment(todo.due_date).local().toString();
  }
  render() {
    const { todo, onCheckboxChange, onDestroyClick } = this.props;
    return (
      <tr key={todo.id}>
        <td className={styles.contentCol} onClick={() => this.setState({ contentEditing: true })}>
          <input type="checkbox" checked={todo.done} onChange={onCheckboxChange}/>
          {this.renderContent()}
        </td>
        <td className={styles.dueDateCol} onClick={() => this.setState({ dueDateEditing: true })}>
          {this.renderDueDate()}
        </td>
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
    onContentBlur(event, todo) {
        dispatch(updateTodo(ownProps.id, event.target.value, todo.dueDate));
    },
    onDueDateBlur(dt, todo) {
        dispatch(updateTodo(ownProps.id, todo.content, dt.toISOString()));
    },
    onDestroyClick() {
      if (confirm('Are you sure?')) {
        dispatch(deleteTodo(ownProps.id));
      }
    },
  }),
)(TodoItem);
