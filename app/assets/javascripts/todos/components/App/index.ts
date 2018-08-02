import { flow } from 'lodash'
import { hot } from 'react-hot-loader'
import { connect } from 'react-redux'
import { StoreState, visibleTodos } from '../../reducers'
import App, { Props } from './render'

export default flow([
  hot(module),
  connect<Props>(({ todos, app }: StoreState) => ({
    todos: visibleTodos(todos, app.sortBy, app.sortOrder, app.doneFilter),
  })),
])(App)
