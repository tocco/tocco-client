import _omit from 'lodash/omit'
import PropTypes from 'prop-types'
import {useEffect, useMemo, useRef, useState} from 'react'

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

const ViewMode = {
  EXPANDED_INITIAL: 'expanded_initial', // initial expanded render (if defined in form config)
  EXPANDED: 'expanded', // expanded manually by user
  COLLAPSED: 'collapsed'
}

/**
 * Allows to render EditableValues as a range. The value can be switched between a range or single value.
 */
const Range = props => {
  const {value, events, readOnly, type, options, fromText, toText, expanded} = props

  const [viewMode, setViewMode] = useState(expanded ? ViewMode.EXPANDED_INITIAL : ViewMode.COLLAPSED)

  const typeMapping = rangeTypeMappings[type]

  useEffect(() => {
    const getFromOrTo = val => (typeMapping?.fromRange ? typeMapping.fromRange(val) : val?.from || val?.to || null)

    const getRangeValue = val =>
      typeMapping?.toRange ? typeMapping.toRange(val) : {from: val, to: val, isRangeValue: true}

    if (viewMode === ViewMode.EXPANDED_INITIAL && value && !value.isRangeValue) {
      // initial expanded render with single default value (user hasn't collased and expanded the component yet)
      // in this case we want to keep the open range and use the default value as `from` value (if there is one)
      events.onChange({from: value, to: undefined, isRangeValue: true})
    } else if (viewMode === ViewMode.EXPANDED && !value?.isRangeValue) {
      // user has changed to expanded mode -> change to range value
      events.onChange(getRangeValue(value))
    } else if (viewMode === ViewMode.COLLAPSED && value?.isRangeValue) {
      // user has changed to collapsed mode -> change to single value
      events.onChange(getFromOrTo(value))
    }
  }, [viewMode, value, events, typeMapping])

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
      onChange: events.onChange
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

  const getToOptions = (opts, fromValue) =>
    typeMapping?.getToOptions ? typeMapping.getToOptions(opts, fromValue) : opts

  const getFromOptions = (opts, toValue) =>
    typeMapping?.getFromOptions ? typeMapping.getFromOptions(opts, toValue) : opts

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
            setViewMode(hasRangeValue ? ViewMode.COLLAPSED : ViewMode.EXPANDED)
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
  toText: PropTypes.string,
  /**
   * Set to true if the initial render should be in expanded view mode (default false)
   */
  expanded: PropTypes.bool
}

export default Range
