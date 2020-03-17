import PropTypes from 'prop-types'
import React from 'react'

import StyledRange from './StyledRange'
import EditableValue from '../EditableValue'
import Ball from '../Ball'

/**
 * Allows to render EditableValues as a range. The value can be switched between a range or single value.
 */
const Range = props => {
  const {value, events, readOnly} = props
  const hasRangeValue = typeof value === 'object' && value && value.isRangeValue

  const handleExactChange = v => {
    events.onChange(v)
  }

  const handleRangeChange = newValue => {
    events.onChange({
      isRangeValue: true,
      ...value,
      ...newValue
    })
  }

  const getFromOrTo = value => value && value.to ? value.to : value && value.from ? value.from : null

  return <StyledRange>
    <div>
      {!hasRangeValue
        ? <EditableValue {...props} events={{...events, onChange: v => handleExactChange(v)}}/>
        : <div className="input">
          <div>from</div>
          <EditableValue {...props} value={value && value.from ? value.from : null} events={{
            onChange: v => {
              handleRangeChange({from: v})
            }
          }}/>
          <div>to</div>
          <EditableValue {...props} value={value && value.to ? value.to : null} events={{
            onChange: v => {
              handleRangeChange({to: v})
            }
          }}/>
        </div>}
    </div>
    <div className="extender">
      <Ball disabled={readOnly} icon={hasRangeValue ? 'minus' : 'plus'} onClick={() => {
        if (hasRangeValue) {
          events.onChange(getFromOrTo(value))
        } else {
          events.onChange({from: value, to: value, isRangeValue: true})
        }
      }}></Ball>
    </div>
  </StyledRange>
}

Range.propTypes = {
  /**
   * EditableValue type
   */
  type: PropTypes.string,
  /**
   * The Range Component can either handle a single value or and object with the following three
   * attributes: isRangeValue (true), from, to. The later two are single values.
   * example:
   *  {
   *    isRangeValue: true,
   *    from: 1,
   *    to: 2
   *  }
   */
  value: PropTypes.any,
  /**
   * See EditableValue
   */
  events: PropTypes.shape({
    onChange: PropTypes.func
  }).isRequired,
  /**
   * See EditableValue
   */
  readOnly: PropTypes.bool,
  /**
   * See EditableValue
   */
  options: PropTypes.object
}

export default Range
