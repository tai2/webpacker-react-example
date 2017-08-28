import request from 'superagent'
import { csrfToken } from 'rails-ujs'
import _ from 'lodash'

function error (res) {
  return new Error((res && res.body && res.body.data && res.body.data.message) || 'unexpected error')
}

function snakeCaseKeys (obj) {
  const tr = obj => _.transform(obj, (result, value, key) => {
    result[_.snakeCase(key)] = _.isPlainObject(value) ? tr(value) : value
  })
  return tr(obj)
}

function camelCaseKeys (obj) {
  const tr = obj => _.transform(obj, (result, value, key) => {
    result[_.camelCase(key)] = _.isPlainObject(value) ? tr(value) : value
  })
  return tr(obj)
}

export function addTodo (content, dueDate, done) {
  return new Promise((resolve, reject) => {
    const data = {
      content,
      dueDate,
      done
    }
    request.post('/todos.json')
      .send(snakeCaseKeys(data))
      .set('X-CSRF-Token', csrfToken())
      .end((err, res) => {
        if (err) {
          reject(error(res))
        } else {
          resolve(camelCaseKeys(res.body))
        }
      })
  })
}

export function updateTodo (id, content, dueDate, done) {
  return new Promise((resolve, reject) => {
    const data = _.omitBy({
      content,
      dueDate,
      done
    }, _.isUndefined)
    request.put(`/todos/${id}.json`)
      .send(snakeCaseKeys(data))
      .set('X-CSRF-Token', csrfToken())
      .end((err, res) => {
        if (err) {
          reject(error(res))
        } else {
          resolve(camelCaseKeys(res.body))
        }
      })
  })
}

export function deleteTodo (id) {
  return new Promise((resolve, reject) => {
    request.delete(`/todos/${id}.json`)
      .set('X-CSRF-Token', csrfToken())
      .end((err, res) => {
        if (err) {
          reject(error(res))
        } else {
          resolve()
        }
      })
  })
}
