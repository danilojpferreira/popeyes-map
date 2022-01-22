/* eslint-disable @typescript-eslint/no-explicit-any */
import { SET_LOADING } from '../types/configurationsTypes'

export const setLoading = (loading: boolean) => (dispatch: any) => {
  dispatch({
    type: SET_LOADING,
    payload: loading,
  })
}
