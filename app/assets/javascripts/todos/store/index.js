import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import camelcaseKeys from 'camelcase-keys';
import reducers from '../reducers';
import rootSaga from '../sagas';

function convert(state) {
  const byId = state.todos.reduce((prev, curr) => {
    prev[curr.id] = camelcaseKeys(curr, { deep: true });
    return prev;
  }, {});
  const ids = state.todos.map(todo => todo.id);

  return {
    todos: {
      byId,
      ids,
    },
  };
}

export default function createAppStore(preloadedState) {
	const sagaMiddleware = createSagaMiddleware();
	const enhancer = composeWithDevTools(
		applyMiddleware(sagaMiddleware)
	);

  const store = createStore(
    reducers,
    convert(preloadedState),
    enhancer,
  );

  sagaMiddleware.run(rootSaga);

	return store
}

