import PropTypes from 'prop-types'
import React, {useMemo} from 'react'
import _omit from 'lodash/omit'

import {
  StyledRange,
  StyledInputWrapper,
  StyledInputItemWrapper,
  StyledIconWrapper,
  StyledInput,
  StyledExtender
} from './StyledRange'
import EditableValue from '../EditableValue'
import Ball from '../Ball'
import Icon from '../Icon'
import rangeTypeMappings from './rangeTypeMappings'

/**
 * Allows to render EditableValues as a range. The value can be switched between a range or single value.
 */
const Range = props => {
  const {value, events, readOnly, type, options} = props
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

  const typeMapping = rangeTypeMappings[type]

  const getToOptions = (options, fromValue) =>
    typeMapping && typeMapping.getToOptions
      ? typeMapping.getToOptions(options, fromValue)
      : options

  const getFromOptions = (options, toValue) =>
    typeMapping && typeMapping.getFromOptions
      ? typeMapping.getFromOptions(options, toValue)
      : options

  const getFromOrTo = value =>
    typeMapping && typeMapping.fromRange
      ? typeMapping.fromRange(value)
      : value && value.from ? value.from : value && value.to ? value.to : null

  const getRangeValue = value =>
    typeMapping && typeMapping.toRange
      ? typeMapping.toRange(value)
      : {from: value, to: value, isRangeValue: true}

  const baseType = typeMapping && typeMapping.type ? typeMapping.type : type

  return <StyledRange>
    <StyledInputWrapper>
      {!hasRangeValue
        ? <EditableValue
          type={baseType}
          {..._omit(props, ['type'])}
          events={exactEvents}
        />
        : <StyledInput>
          <StyledInputItemWrapper>
            <EditableValue
              {...props}
              options={getFromOptions(options, value.to)}
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
              options={getToOptions(options, value.from)}
              value={value && value.to ? value.to : null}
              events={toEvents}
            />
          </StyledInputItemWrapper>
        </StyledInput>}
    </StyledInputWrapper>
    <StyledExtender>
      <Ball disabled={readOnly} icon={hasRangeValue ? 'chevron-left' : 'chevron-down'} onClick={() => {
        if (hasRangeValue) {
          events.onChange(getFromOrTo(value))
        } else {
          events.onChange(getRangeValue(value))
        }
      }}>
      </Ball>
    </StyledExtender>
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
