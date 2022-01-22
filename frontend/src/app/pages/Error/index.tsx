import React, { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components'
import './style.scss'

const Error = (): JSX.Element => {
  const navigate = useNavigate()

  return (
    <div>
      <h1 className="error-title">404</h1>
      <h2 className="error-text">Ooops!</h2>
      <h3 className="error-message">
        {
          // eslint-disable-next-line react/jsx-curly-brace-presence
          "The route that you're looking for it's not available."
        }
      </h3>
      <div className="error-button">
        <Button text="BACK" onClick={() => navigate('/')} />
      </div>
    </div>
  )
}

export default memo(Error)
