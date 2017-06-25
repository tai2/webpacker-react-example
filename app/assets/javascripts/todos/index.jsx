import React from 'react'
import ReactDOM from 'react-dom'

function TodoApp({ todos }) {
  return (<div>
    <table className="table">
      <thead>
        <tr>
          <th>content</th>
          <th>due date</th>
          <th>done</th>
        </tr>
      </thead>
      <tbody>
        {todos.map(todo => (
          <tr key={todo.id}>
            <td>{todo.content}</td>
            <td>{todo.created_at}</td>
            <td>{todo.done.toString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>);
}

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('todos-data')
  const data = JSON.parse(node.getAttribute('data'))

  ReactDOM.render(
    <TodoApp todos={data.todos}/>,
    document.body.appendChild(document.createElement('div')),
  )
})
