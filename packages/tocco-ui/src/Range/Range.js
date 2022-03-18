import _omit from 'lodash/omit'
import PropTypes from 'prop-types'
import React, {useMemo, useRef} from 'react'

import Ball from '../Ball'
import EditableValue from '../EditableValue'
import Icon from '../Icon'
import rangeTypeMappings from './rangeTypeMappings'
import {
  StyledExtender,
  StyledIconWrapper,
  StyledInput,
  StyledInputItemWrapper,
  StyledInputWrapper,
  StyledRange
} from './StyledRange'

/**
 * Allows to render EditableValues as a range. The value can be switched between a range or single value.
 */
const Range = props => {
  const {value, events, readOnly, type, options, fromText, toText} = props
  const hasRangeValue = value?.isRangeValue || false

  /**
   * Workaround:
   * https://toccoag.atlassian.net/browse/TOCDEV-5176
   * Problem:
   *   When range is enabled and
   *   to or from values changes
   *   the other value will be reset to a previous value
   *
   * Somehow the `value` in the onChanges handlers was outdated and still had the previous value.
   * Not sure why this wasn't working properly although all memoized hooks have been removed.
   * Therefore the current value is now attached via a `ref` which is not bound 1:1 to the state.
   */
  const valueRef = useRef(value)
  valueRef.current = value

  const exactEvents = useMemo(
    () => ({
      ...events,
      onChange: value => {
        events.onChange(value)
      }
    }),
    [events]
  )

  const toEvents = {
    onChange: toValue => {
      events.onChange({
        ...valueRef.current,
        to: toValue
      })
    }
  }

  const fromEvents = {
    onChange: fromValue => {
      events.onChange({
        ...valueRef.current,
        from: fromValue
      })
    }
  }

  const typeMapping = rangeTypeMappings[type]

  const getToOptions = (options, fromValue) =>
    typeMapping?.getToOptions ? typeMapping.getToOptions(options, fromValue) : options

  const getFromOptions = (options, toValue) =>
    typeMapping?.getFromOptions ? typeMapping.getFromOptions(options, toValue) : options

  const getFromOrTo = value =>
    typeMapping?.fromRange ? typeMapping.fromRange(value) : value?.from || value?.to || null

  const getRangeValue = value =>
    typeMapping?.toRange ? typeMapping.toRange(value) : {from: value, to: value, isRangeValue: true}

  const rangeValueIcon = typeMapping?.icons?.range || 'chevron-down'
  const singleValueIcon = typeMapping?.icons?.single || 'chevron-left'

  const baseType = typeMapping?.type || type

  return (
    <StyledRange>
      <StyledInputWrapper>
        {!hasRangeValue ? (
          <EditableValue type={baseType} {..._omit(props, ['type'])} events={exactEvents} />
        ) : (
          <StyledInput>
            <StyledInputItemWrapper>
              <EditableValue
                {...props}
                options={getFromOptions(options, value.to)}
                value={value?.from || null}
                events={fromEvents}
                placeholder={fromText}
              />
            </StyledInputItemWrapper>
            <StyledIconWrapper>
              <Icon icon="horizontal-rule" />
            </StyledIconWrapper>
            <StyledInputItemWrapper>
              <EditableValue
                {...props}
                options={getToOptions(options, value.from)}
                value={value?.to || null}
                events={toEvents}
                placeholder={toText}
              />
            </StyledInputItemWrapper>
          </StyledInput>
        )}
      </StyledInputWrapper>
      <StyledExtender>
        <Ball
          disabled={readOnly}
          icon={hasRangeValue ? singleValueIcon : rangeValueIcon}
          onClick={() => {
            const val = hasRangeValue ? getFromOrTo(value) : getRangeValue(value)
            events.onChange(val)
          }}
        ></Ball>
      </StyledExtender>
    </StyledRange>
  )
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
