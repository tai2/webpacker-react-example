import React, { Component }  from 'react';
import { connect } from 'react-redux';
import DateTime from 'react-datetime/DateTime';
import moment from 'moment';
import { toggleTodoDone, updateTodo, deleteTodo } from '../actions';
import EditButton from './EditButton';
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
    const { todo, onCheckboxChange, onContentBlur } = this.props;

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

    return (
      <div>
        <label className={styles.contentLabel}>
          <input type="checkbox" checked={todo.done} onChange={onCheckboxChange}/>
          {todo.content}
        </label>
        <EditButton className={styles.editButton} onClick={() => this.setState({ contentEditing: true })} />
      </div>
    );
  }
  renderDueDate() {
    const { todo, onDueDateBlur } = this.props;

    if (this.state.dueDateEditing) {
      return (
        <DateTime
          defaultValue={new Date(todo.dueDate)}
          onBlur={(dt) => {
            this.setState({ dueDateEditing: false });
            onDueDateBlur(dt, todo);
          }}
          inputProps={{ autoFocus: true }}
        />
      );
    }

    return (
      <div>
        {moment(todo.dueDate).local().toString()}
        <EditButton className={styles.editButton} onClick={() => this.setState({ dueDateEditing: true })} />
      </div>
    );
  }
  render() {
    const { todo, onDestroyClick } = this.props;
    return (
      <tr key={todo.id}>
        <td className={styles.contentCol}>{this.renderContent()}</td>
        <td className={styles.dueDateCol}>{this.renderDueDate()}</td>
        <td><button className="btn btn-default" onClick={onDestroyClick}>Destroy</button></td>
      </tr>
    );
  }
}

export default connect(
  (state, ownProps) => ({
    todo: state.todos.byId[ownProps.id],
  }),
  (dispatch, ownProps) => ({
    onCheckboxChange() {
      dispatch(toggleTodoDone(ownProps.id));
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
