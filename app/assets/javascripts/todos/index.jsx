// import 'babel-polyfill';
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/App'
import createAppStore from './store'

function getPreloadedState () {
  const node = document.getElementById('todos-data')
  return JSON.parse(node.getAttribute('data'))
}

document.addEventListener('DOMContentLoaded', () => {
  const store = createAppStore(getPreloadedState())

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('todo-app')
  )
})
