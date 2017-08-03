import React from 'react';
import ReactDOM from 'react-dom';
import squareIcon from 'images/square-o.svg';
import checkSquareIcon from 'images/check-square-o.svg';

function TodoApp({ todos }) {
  return (<div>
    <table className="table">
      <thead>
        <tr>
          <th>content</th>
          <th>due date</th>
        </tr>
      </thead>
      <tbody>
        {todos.map(todo => (
          <tr key={todo.id}>
            <td>
              <img className="check" src={todo.done ? squareIcon : checkSquareIcon} />
              {todo.content}
            </td>
            <td>{todo.created_at}</td>
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
