/* tslint:disable:ordered-imports */
import 'react-hot-loader/patch'
/* tslint:enable:ordered-imports */

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { Store } from 'redux'
import { camelCaseKeys, snakeCaseKeys } from '../lib/case-util'
import App from './components/App'
import { StoreState } from './reducers'
import createAppStore from './store'
import { Todo } from './types'

interface ServerState {
  todos: Array<{
    id: number
    content: string
    done: boolean
    due_date: string
    created_at: string
    updated_at: string
  }>
}

function convert(state: ServerState): Partial<StoreState> {
  const accumulator: { [id: number]: Todo } = {}
  const byId = state.todos.reduce((prev, curr) => {
    prev[curr.id] = camelCaseKeys(curr) as Todo
    return prev
  }, accumulator)
  const ids = state.todos.map(todo => todo.id)

  return {
    todos: {
      byId,
      ids,
    },
  }
}

let store: Store<StoreState>

function render(Component: any) {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('todo-app')
  )
}

function getPreloadedState() {
  const node = document.getElementById('todos-data')!
  return convert(JSON.parse(node.getAttribute('data')!) as ServerState)
}

document.addEventListener('DOMContentLoaded', () => {
  store = createAppStore(getPreloadedState())
  render(App)
})

if (module.hot) {
  module.hot.accept('./components/App', () => {
    render(App)
  })
}
