import React, { memo, ReactNode } from 'react'
import './styles.scss'

interface Props {
  children: ReactNode
  className?: string
}

const Card = ({ children, className = '' }: Props): JSX.Element => (
  <div className={`card ${className}`}>{children}</div>
)

export default memo(Card)
