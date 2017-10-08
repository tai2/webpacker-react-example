import { connect } from 'react-redux'
import { StoreState, visibleTodos } from '../../reducers'
import App, { Props } from './render'

export default connect<Props>(({ todos, app }: StoreState) => ({
  todos: visibleTodos(todos, app.sortBy, app.sortOrder, app.doneFilter),
}))(App)
