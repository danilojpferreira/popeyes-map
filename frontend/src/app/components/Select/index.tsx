/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { memo } from 'react'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as InputSelect,
} from '@material-ui/core'
import './styles.scss'

interface Props {
  id?: string
  label: string
  selected?: string | number
  options: {
    value: string | number | boolean | null
    label: string
  }[]
  onSelect?: (value: number | string) => void
  title?: string
  className?: string
  disabled?: boolean
}

const Select = ({
  id,
  label,
  selected,
  options,
  onSelect,
  title,
  className,
  disabled,
}: Props): JSX.Element => (
  <div className={`select ${className}`}>
    {title && <p className="select_title">{title}</p>}
    <FormControl
      variant="filled"
      className="select_form-control"
      disabled={disabled}
    >
      <InputLabel id={id}>{label}</InputLabel>
      <InputSelect
        labelId={id}
        value={selected}
        // @ts-ignore
        onChange={({ target }) => onSelect(target.value)}
      >
        {options.map(item => (
          // @ts-ignore
          <MenuItem key={Math.random()} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </InputSelect>
    </FormControl>
  </div>
)

export default memo(Select)
