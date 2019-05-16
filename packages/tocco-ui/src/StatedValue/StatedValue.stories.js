import React from 'react'
import PropTypes from 'prop-types'
import {storiesOf} from '@storybook/react'
import {withKnobs, boolean, select, text} from '@storybook/addon-knobs'

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
      knobs
    } = this.props

    const {
      dirty,
      hasValue,
      touched,
      value
    } = this.state

    return (
      <StatedValue
        {...knobs}
        dirty={dirty}
        hasValue={hasValue}
        id={id}
        key={id}
        mandatoryTitle="input is required"
        touched={touched}>
        <input
          id={id}
          disabled={knobs.immutable}
          onChange={this.handleChange}
          style={{
            border: 0,
            cursor: knobs.immutable && !knobs.isDisplay ? 'not-allowed' : 'auto',
            color: knobs.immutable && !knobs.isDisplay ? '#909090' : '#000',
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
  knobs: PropTypes.object,
  immutable: PropTypes.bool,
  value: PropTypes.string
}

storiesOf('Tocco-UI | StatedValue', module)
  .addDecorator(withKnobs)
  .add(
    'StatedValue',
    () => {
      const knobs = {
        description: text('description', 'A helper text to instruct users.'),
        error: select('error', {
          'no errors': errors.no,
          'mixed errors': errors.mixed
        }),
        label: text('label', 'label'),
        mandatory: boolean('mandatory', false) || undefined,
        isDisplay: boolean('isDisplay', false) || undefined,
        immutable: boolean('immutable', false) || undefined
      }
      return [
        <StatedValueWrapper
          id="input-1"
          key="input-1"
          knobs={knobs}
        />,
        <StatedValueWrapper
          id="input-2"
          key="input-2"
          knobs={knobs}
          value="initial value"
        />,
        <StatedValueWrapper
          id="input-3"
          key="input-3"
          knobs={knobs}
        />
      ]
    }
  )
