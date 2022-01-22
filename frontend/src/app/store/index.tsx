import { createStore, applyMiddleware, compose } from 'redux'
import reduxLogger from 'redux-logger'
import thunk from 'redux-thunk'
import { rootReducer } from './reducers'

const middleware =
  process.env.NODE_ENV === 'development' ? [thunk, reduxLogger] : [thunk]

export const store = createStore(
  rootReducer,
  compose(applyMiddleware(...middleware))
)
