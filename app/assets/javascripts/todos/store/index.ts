import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction'
import reducers, { StoreState } from '../reducers'
import rootSaga from '../sagas'

export default function createAppStore (preloadedState: Partial<StoreState>) {
  const sagaMiddleware = createSagaMiddleware()
  const enhancer = composeWithDevTools(
    applyMiddleware(sagaMiddleware)
  )

  const store = createStore(
    reducers,
    preloadedState,
    enhancer
  )

  sagaMiddleware.run(rootSaga)

  return store
}
