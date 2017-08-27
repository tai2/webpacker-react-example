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

const store = createAppStore(getPreloadedState())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('todo-app')
)

if (module.hot) {
  module.hot.accept('./components/App', function() {
    console.log('Accepting the updated printMe module!');
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById('todo-app')
    )
  })
}
