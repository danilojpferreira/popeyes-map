import { combineReducers } from 'redux'
import { configurationsReducer } from './configurationsReducer'

export const rootReducer = combineReducers({
  configurationsState: configurationsReducer,
})

export type RootState = ReturnType<typeof rootReducer>
