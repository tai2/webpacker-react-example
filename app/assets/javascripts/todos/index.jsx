import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App'

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('todos-data')
  const data = JSON.parse(node.getAttribute('data'))

  ReactDOM.render(
    <App todos={data.todos}/>,
    document.getElementById('todo-app'),
  )
})
