// @flow

import React from 'react'

type Props = {
  name: string,
  label: string,
  value?: string,
  onChange: (value: string) => void,
  readOnly?: boolean,
  onKeyDown?: (e: SyntheticKeyboardEvent) => void,
  autoFocus?: boolean
}

const PasswordInput = (props: Props) => (
  <div className={'form-group ' + props.name}>
    <label className="font-bold" htmlFor={props.name + 'Input'}>{props.label}</label>
    <input
      type="password"
      className="form-control"
      id={props.name + 'Input'}
      value={props.value}
      onChange={e => props.onChange(e.target.value)}
      readOnly={props.readOnly === true}
      onKeyDown={props.onKeyDown}
      autoFocus={props.autoFocus}
    />
  </div>
)

export default PasswordInput
