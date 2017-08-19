import React, { Component }  from 'react';
import { connect } from 'react-redux';
import DateTime from 'react-datetime/DateTime';
import moment from 'moment';
import classNames from 'classnames';
import { addTodo } from '../actions';
import styles from './TodoAddForm.scss';

class TodoAddForm extends Component {
  constructor() {
    super();
    this.state = {
      content: '',
      dueDate: new Date(),
    };
  }
  handleAddTodo() {
    this.setState({ content: '', dueDate: new Date() });
    this.props.onAddTodo(this.state.content, this.state.dueDate);
  }
  render() {
    return (
      <div className="form-inline">
        <div className={classNames('form-group', styles.item)}>
          <label>Content:&nbsp;
            <input className={styles.content}
              type="text"
              value={this.state.content}
              onChange={(e) => this.setState({ content: e.target.value })}
            />
          </label>
        </div>
        <div className={classNames('form-group', styles.item)}>
          <label>DueDate:&nbsp;
            <DateTime
              className={styles.dueDate}
              value={this.state.dueDate}
              onChange={(dt) => this.setState({ dueDate: dt.toDate() })}
            />
          </label>
        </div>
        <button
          className={classNames('btn btn-default', styles.item)}
          onClick={() => this.handleAddTodo()}
        >Create Todo</button>
      </div>
    );
  }
}

export default connect(
  null,
  (dispatch, ownProps) => ({
    onAddTodo(content, dueDate) {
        dispatch(addTodo(content, dueDate, moment().toISOString()));
    },
  }),
)(TodoAddForm);
