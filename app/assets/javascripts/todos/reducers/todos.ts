import * as actions from '../actions'

import * as _ from 'lodash'
import { SortBy, SortOrder } from '../reducers/app'
import { Todo } from '../types'

export interface TodoMap {
  readonly [id: number]: Readonly<Todo>
}

export interface TodosState {
  readonly byId: TodoMap
  readonly ids: number[]
}

export const initialTodosState: TodosState = {
  byId: {},
  ids: [],
}

function addTodoReceived(state: TodosState, action: actions.AddTodoReceived) {
  if (action.payload instanceof Error) {
    return state
  }

  const newTodo = action.payload.item

  return {
    ...state,
    byId: {
      ...state.byId,
      [newTodo.id]: newTodo,
    },
    ids: [...state.ids, newTodo.id],
  }
}

function updateTodoReceived(
  state: TodosState,
  action: actions.UpdateTodoReceived
) {
  if (action.payload instanceof Error) {
    return state
  }

  const updatedTodo = action.payload.item

  return {
    ...state,
    byId: {
      ...state.byId,
      [updatedTodo.id]: updatedTodo,
    },
  }
}

function toggleTodoDoneReceived(
  state: TodosState,
  action: actions.ToggleTodoDoneReceived
) {
  if (action.payload instanceof Error) {
    return state
  }

  const updatedTodo = action.payload.item

  return {
    ...state,
    byId: {
      ...state.byId,
      [updatedTodo.id]: updatedTodo,
    },
  }
}

function deleteTodoReceived(
  state: TodosState,
  action: actions.DeleteTodoReceived
) {
  if (action.payload instanceof Error) {
    return state
  }

  const { id } = action.payload.item
  const byId: TodoMap = _.omit(state.byId, [id])
  const ids = state.ids.filter(item => item !== id)

  return {
    ...state,
    byId,
    ids,
  }
}

export default function todosReducer(
  state: TodosState = initialTodosState,
  action: actions.Action
): TodosState {
  switch (action.type) {
    case actions.ADD_TODO_RECEIVED:
      return addTodoReceived(state, action)
    case actions.UPDATE_TODO_RECEIVED:
      return updateTodoReceived(state, action)
    case actions.TOGGLE_TODO_DONE_RECEIVED:
      return toggleTodoDoneReceived(state, action)
    case actions.DELETE_TODO_RECEIVED:
      return deleteTodoReceived(state, action)
    default:
      return state
  }
}

export function visibleTodos(
  state: TodosState,
  prop: SortBy,
  order: SortOrder,
  done: boolean
): number[] {
  // When done is required, return all todos including done.
  const ids = done ? state.ids : state.ids.filter(id => !state.byId[id].done)

  const time = (id: number) => new Date(state.byId[id][prop]).getTime()
  return _.orderBy(ids, time, [order])
}
