import request from 'superagent';
import { csrfToken } from 'rails-ujs';
import _ from 'lodash';
import camelcaseKeys from 'camelcase-keys';

export function addTodo(content, due_date, done) {
  return new Promise((resolve, reject) => {
    const data = {
      content,
      due_date,
      done,
    };
    request.post('/todos.json')
      .send(data)
      .set('X-CSRF-Token', csrfToken())
      .end((err, res) => {
        if (err) {
          reject(error(res));
        } else {
          resolve(camelcaseKeys(res.body));
        }
      });
  });
}

export function updateTodo(id, content, due_date, done) {
  return new Promise((resolve, reject) => {
    const data = _.omitBy({
      content,
      due_date,
      done,
    }, _.isUndefined);
    request.put(`/todos/${id}.json`)
      .send(data)
      .set('X-CSRF-Token', csrfToken())
      .end((err, res) => {
        if (err) {
          reject(error(res));
        } else {
          resolve(camelcaseKeys(res.body));
        }
      });
  });
}

export function deleteTodo(id) {
  return new Promise((resolve, reject) => {
    request.delete(`/todos/${id}.json`)
      .set('X-CSRF-Token', csrfToken())
      .end((err, res) => {
        if (err) {
          reject(error(res));
        } else {
          resolve();
        }
      });
  });
}
