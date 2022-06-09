import PropTypes from 'prop-types'
import {useState} from 'react'

import StatedValue from './StatedValue'
import {StyledInput} from './StyledStatedValue'

const errors = {
  no: {},
  mixed: {
    error1: ['error1-1', 'error1-2'],
    error2: ['error2']
  }
}

const StatedValueWrapper = ({value: valueProp, id, args}) => {
  const initialState = {
    hasValue: valueProp.length > 0 || false,
    value: valueProp
  }
  const [statedValueState, setStatedValueState] = useState(initialState)

  const handleChange = event => {
    setStatedValueState({
      dirty: event.target.value !== valueProp.value,
      hasValue: event.target.value.length > 0,
      touched: true,
      value: event.target.value
    })
  }

  const {dirty, hasValue, touched, value} = statedValueState

  return (
    <StatedValue
      {...args}
      dirty={dirty}
      hasValue={hasValue}
      id={id}
      key={id}
      mandatoryTitle="input is required"
      touched={touched}
    >
      <StyledInput id={id} disabled={args.immutable} onChange={handleChange} type="text" value={value} args={args} />
    </StatedValue>
  )
}

StatedValueWrapper.defaultProps = {
  value: ''
}

StatedValueWrapper.propTypes = {
  id: PropTypes.string,
  args: PropTypes.object,
  immutable: PropTypes.bool,
  value: PropTypes.string
}

export default {
  title: 'Tocco-UI/StatedValue',
  component: StatedValue,
  argTypes: {
    description: {type: 'text', defaultValue: 'A helper text to instruct users.'},
    error: {type: 'object', defaultValue: errors.mixed},
    label: {type: 'text', defaultValue: 'label'},
    mandatory: {type: 'boolean', defaultValue: false},
    isDisplay: {type: 'boolean', defaultValue: false},
    immutable: {type: 'boolean', defaultValue: false}
  }
}

export const Basic = args => {
  return [
    <StatedValueWrapper id="input-1" key="input-1" args={args} />,
    <StatedValueWrapper id="input-2" key="input-2" args={args} value="initial value" />,
    <StatedValueWrapper id="input-3" key="input-3" args={args} />
  ]
}
