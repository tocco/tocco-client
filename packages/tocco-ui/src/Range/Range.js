import PropTypes from 'prop-types'
import React, {useMemo} from 'react'

import StyledRange, {StyledInputWrapper, StyledInputItemWrapper, StyledIconWrapper} from './StyledRange'
import EditableValue from '../EditableValue'
import Ball from '../Ball'
import {Icon} from '../index'

const getToOptions = (type, options, fromValue) => {
  switch (type) {
    case 'date':
    case 'datetime':
      return {...options, flatpickrOptions: {minDate: fromValue}}
    default:
      return options
  }
}

const getFromOptions = (type, options, toValue) => {
  switch (type) {
    case 'date':
    case 'datetime':
      return {...options, flatpickrOptions: {maxDate: toValue}}
    default:
      return options
  }
}

/**
 * Allows to render EditableValues as a range. The value can be switched between a range or single value.
 */
const Range = props => {
  const {value, events, readOnly} = props
  const hasRangeValue = typeof value === 'object' && value && value.isRangeValue

  const exactEvents = useMemo(() => ({
    ...events,
    onChange: value => {
      events.onChange(value)
    }
  }))

  const toEvents = useMemo(() => ({
    onChange: toValue => {
      events.onChange({
        ...value,
        to: toValue
      })
    }
  }))

  const fromEvents = useMemo(() => ({
    onChange: fromValue => {
      events.onChange({
        ...value,
        from: fromValue
      })
    }
  }))

  const getFromOrTo = value => value && value.to ? value.to : value && value.from ? value.from : null

  return <StyledRange>
    <StyledInputWrapper>
      {!hasRangeValue
        ? <EditableValue
          {...props}
          events={exactEvents}
        />
        : <div className="input">
          <StyledInputItemWrapper>
            <EditableValue
              {...props}
              options={getFromOptions(props.type, props.options, value.to)}
              value={value && value.from ? value.from : null}
              events={fromEvents}
            />
          </StyledInputItemWrapper>
          <StyledIconWrapper>
            <Icon icon="horizontal-rule"/>
          </StyledIconWrapper>
          <StyledInputItemWrapper>
            <EditableValue
              {...props}
              options={getToOptions(props.type, props.options, value.from)}
              value={value && value.to ? value.to : null}
              events={toEvents}
            />
          </StyledInputItemWrapper>
        </div>}
    </StyledInputWrapper>
    <div className="extender">
      <Ball disabled={readOnly} icon={hasRangeValue ? 'chevron-left' : 'chevron-down'} onClick={() => {
        if (hasRangeValue) {
          events.onChange(getFromOrTo(value))
        } else {
          events.onChange({from: value, to: value, isRangeValue: true})
        }
      }}>
      </Ball>
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
  options: PropTypes.object,
  /**
   * Shown above "from" input
   */
  fromText: PropTypes.string,
  /**
   * Shown above "to" input
   */
  toText: PropTypes.string
}

export default Range
