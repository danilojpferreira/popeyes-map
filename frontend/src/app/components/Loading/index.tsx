import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { CircularProgress } from '@material-ui/core'
import { Card } from '..'
import { RootState } from '../../store/reducers'
import './styles.scss'

const Loading = (): JSX.Element => {
  const { isLoading } = useSelector(
    (state: RootState) => state.configurationsState
  )
  return (
    isLoading && (
      <div className="loading">
        <Card className="loading_card">
          <CircularProgress />
          <p>Please wait, loading...</p>
        </Card>
      </div>
    )
  )
}

export default memo(Loading)
