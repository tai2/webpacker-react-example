import _ from 'lodash'

const initialState = {
  byId: {},
  ids: []
}

function addTodoReceived (state, action) {
  const newTodo = action.payload

  return {
    ...state,
    byId: {
      ...state.byId,
      [newTodo.id]: newTodo
    },
    ids: [ ...state.ids, newTodo.id ]
  }
}

function updateTodoReceived (state, action) {
  const updatedTodo = action.payload

  return {
    ...state,
    byId: {
      ...state.byId,
      [updatedTodo.id]: updatedTodo
    }
  }
}

function toggleTodoDoneReceived (state, action) {
  const updatedTodo = action.payload

  return {
    ...state,
    byId: {
      ...state.byId,
      [updatedTodo.id]: updatedTodo
    }
  }
}

function deleteTodoReceived (state, action) {
  const { id } = action.payload
  const byId = _.omit(state.byId, [id])
  const ids = state.ids.filter(item => item !== id)

  return {
    ...state,
    byId,
    ids
  }
}

export default function todosReducer (state = initialState, action) {
  switch (action.type) {
    case 'ADD_TODO:RECEIVED':
      return addTodoReceived(state, action)
    case 'UPDATE_TODO:RECEIVED':
      return updateTodoReceived(state, action)
    case 'TOGGLE_TODO_DONE:RECEIVED':
      return toggleTodoDoneReceived(state, action)
    case 'DELETE_TODO:RECEIVED':
      return deleteTodoReceived(state, action)
    default:
      return state
  }
}

export function visibleTodos (state, sortBy, done) {
  // When done is required, return all todos including done.
  const ids = done
    ? state.ids
    : state.ids.filter(id => !state.byId[id].done)

  const [prop, order] = sortBy.split('-')
  const time = (id) => new Date(state.byId[id][prop]).getTime()
  return _.orderBy(ids, time, [order])
}
