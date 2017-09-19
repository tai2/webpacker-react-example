import * as request from 'superagent'
import * as _ from 'lodash'
import { csrfToken } from 'rails-ujs'

interface DictToDict {
  (obj: _.Dictionary<any>): _.Dictionary<any>
}

function error (res: request.Response): Error {
  return new Error((res && res.body && res.body.data && res.body.data.message) || 'unexpected error')
}

function snakeCaseKeys (obj: object): object {
  const tr:DictToDict = obj => _.transform(obj, (result, value, key) => {
    result[_.snakeCase(key)] = (_.isPlainObject(value) ? tr(value) : value)
  })
  return tr(obj)
}

function camelCaseKeys (obj: object): object {
  const tr:DictToDict = obj => _.transform(obj, (result, value, key) => {
    result[_.camelCase(key)] = _.isPlainObject(value) ? tr(value) : value
  })
  return tr(obj)
}

export function addTodo (content: string, dueDate: string, done: boolean): Promise<any> {
  return new Promise((resolve, reject) => {
    const data = {
      content,
      dueDate,
      done
    }
    request.post('/todos.json')
      .send(snakeCaseKeys(data))
      .set('X-CSRF-Token', csrfToken()!)
      .end((err, res) => {
        if (err) {
          reject(error(res))
        } else {
          resolve(camelCaseKeys(res.body))
        }
      })
  })
}

export function updateTodo (id: number, content?: string, dueDate?: string, done?: boolean): Promise<any> {
  return new Promise((resolve, reject) => {
    const data = _.omitBy({
      content,
      dueDate,
      done
    }, _.isUndefined)
    request.put(`/todos/${id}.json`)
      .send(snakeCaseKeys(data))
      .set('X-CSRF-Token', csrfToken()!)
      .end((err, res) => {
        if (err) {
          reject(error(res))
        } else {
          resolve(camelCaseKeys(res.body))
        }
      })
  })
}

export function deleteTodo (id: number): Promise<any> {
  return new Promise((resolve, reject) => {
    request.delete(`/todos/${id}.json`)
      .set('X-CSRF-Token', csrfToken()!)
      .end((err, res) => {
        if (err) {
          reject(error(res))
        } else {
          resolve()
        }
      })
  })
}
