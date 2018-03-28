import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { navigationMiddleware } from "./src/modules/navigation";
import { rootSaga, rootReducer } from './src/modules';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  applyMiddleware(navigationMiddleware, sagaMiddleware)
);
sagaMiddleware.run(rootSaga);

export default store;
