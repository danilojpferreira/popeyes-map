/* eslint-disable @typescript-eslint/no-explicit-any */
import { SET_LOADING } from '../types/configurationsTypes'

const initialState: any = { isLoading: false }

export const configurationsReducer = (
  state = initialState,
  { type, payload }: { type: string; payload: any }
): any => {
  switch (type) {
    case SET_LOADING:
      return { ...state, isLoading: payload }
    default:
      return state
  }
}
