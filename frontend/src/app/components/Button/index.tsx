import React, { CSSProperties, memo, MouseEventHandler, ReactNode } from 'react'
import './styles.scss'

interface Props {
  disabled?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
  text: string
  className?: string
  secondary?: boolean
  style?: CSSProperties
  rightIcon?: ReactNode
}

const Button = ({
  disabled,
  onClick,
  text,
  className = '',
  style,
  secondary,
  rightIcon,
}: Props): JSX.Element => (
  <button
    type="button"
    disabled={disabled}
    onClick={onClick}
    className={`button ${className} ${secondary && 'button-secondary'}`}
    style={{
      ...style,
    }}
  >
    {text}
    {rightIcon ? <div className="button_right-icon">{rightIcon}</div> : null}
  </button>
)

export default memo(Button)
