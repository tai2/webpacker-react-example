import request from 'superagent';
import { csrfToken } from 'rails-ujs';
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

