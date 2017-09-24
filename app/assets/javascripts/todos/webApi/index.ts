import * as _ from 'lodash'
import { csrfToken } from 'rails-ujs'
import * as request from 'superagent'
import { camelCaseKeys, snakeCaseKeys } from '../../lib/case-util'

function error(res: request.Response): Error {
  return new Error((res && res.body && res.body.data && res.body.data.message) || 'unexpected error')
}

export interface Todo {
  id: number
  content: string
  done: boolean
  dueDate: string
  createdAt: string
  updatedAt: string
}

export function addTodo(content: string, dueDate: string, done: boolean): Promise<Todo> {
  return new Promise((resolve, reject) => {
    const data = {
      content,
      dueDate,
      done,
    }
    request.post('/todos.json')
      .send(snakeCaseKeys(data))
      .set('X-CSRF-Token', csrfToken()!)
      .end((err, res) => {
        if (err) {
          reject(error(res))
        } else {
          resolve(camelCaseKeys(res.body) as Todo)
        }
      })
  })
}

export function updateTodo(id: number, content?: string, dueDate?: string, done?: boolean): Promise<Todo> {
  return new Promise((resolve, reject) => {
    const data = _.omitBy({
      content,
      dueDate,
      done,
    }, _.isUndefined)
    request.put(`/todos/${id}.json`)
      .send(snakeCaseKeys(data))
      .set('X-CSRF-Token', csrfToken()!)
      .end((err, res) => {
        if (err) {
          reject(error(res))
        } else {
          resolve(camelCaseKeys(res.body) as Todo)
        }
      })
  })
}

export function deleteTodo(id: number): Promise<void> {
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
