import React from 'react'
import PropTypes from 'prop-types'

import StatedValue from './StatedValue'

const errors = {
  no: {},
  mixed: {
    error1: ['error1-1', 'error1-2'],
    error2: ['error2']
  }
}

class StatedValueWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasValue: props.value.length > 0 || false,
      value: props.value
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({
      dirty: event.target.value !== this.props.value,
      hasValue: event.target.value.length > 0,
      touched: true,
      value: event.target.value
    })
  }

  render() {
    const {
      id,
      args
    } = this.props

    const {
      dirty,
      hasValue,
      touched,
      value
    } = this.state

    return (
      <StatedValue
        {...args}
        dirty={dirty}
        hasValue={hasValue}
        id={id}
        key={id}
        mandatoryTitle="input is required"
        touched={touched}>
        <input
          id={id}
          disabled={args.immutable}
          onChange={this.handleChange}
          style={{
            border: 0,
            cursor: args.immutable && !args.isDisplay ? 'not-allowed' : 'auto',
            color: args.immutable && !args.isDisplay ? '#545454' : '#000',
            outline: 0,
            transition: 'color 200ms',
            width: '100%'
          }}
          type="text"
          value={value}
        />
      </StatedValue>
    )
  }
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
  return [<StatedValueWrapper
    id="input-1"
    key="input-1"
    args={args}
  />,
  <StatedValueWrapper
    id="input-2"
    key="input-2"
    args={args}
    value="initial value"
  />,
  <StatedValueWrapper
    id="input-3"
    key="input-3"
    args={args}
  />
  ]
}
