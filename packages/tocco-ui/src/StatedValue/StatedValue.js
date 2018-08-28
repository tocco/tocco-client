import PropTypes from 'prop-types'
import React from 'react'

import ErrorList from '../FormField/ErrorList'
import {
  StyledStatedValueBox,
  StyledStatedValueDescription,
  StyledStatedValueError,
  StyledStatedValueLabel,
  StyledStatedValueWrapper
} from './StyledStatedValue'
import {design} from '../utilStyles'

const detectSignal = (dirty, hasError) => {
  if (hasError) {
    return design.condition.DANGER
  } else if (dirty) {
    return design.condition.WARNING
  }
}

/**
 * Wrap <EditableValue> and <FormattedVaule> in <StatedValue> to describe it
 * and signal conditions.
 */
const StatedValue = props => {
  const {
    content,
    description,
    dirty,
    error,
    hasValue,
    id,
    label,
    mandatory,
    touched
  } = props

  const hasError = touched && props.error && Object.keys(props.error).length > 0
  const signal = detectSignal(dirty, hasError)

  return (
    <StyledStatedValueWrapper hasValue={hasValue}>
      <StyledStatedValueBox signal={signal}>
        {content}
        <StyledStatedValueLabel
          hasValue={hasValue}
          signal={signal}
          htmlFor={id}
        >{label}{mandatory && ' *'}</StyledStatedValueLabel>
      </StyledStatedValueBox>
      {description
        && <StyledStatedValueDescription>{description}</StyledStatedValueDescription>}
      {hasError
        && <StyledStatedValueError>
          <ErrorList error={error}/>
        </StyledStatedValueError>
      }
    </StyledStatedValueWrapper>
  )
}

StatedValue.propTypes = {
  /**
   * A component to enter or display data.
   */
  content: PropTypes.node,
  /**
   * A helper text to instruct users.
   */
  description: PropTypes.string,
  /**
   * If true field is marked as changed.
   */
  dirty: PropTypes.bool,
  /**
   * Error object.
   */
  error: PropTypes.objectOf(PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.node, PropTypes.string]))
  ),
  /**
   * If true label is moved to uncover value.
   */
  hasValue: PropTypes.bool,
  /**
   * Focus target id by clicking on label.
   */
  id: PropTypes.string,
  /**
   * Describe editable value briefly.
   */
  label: PropTypes.string,
  /**
   * If true an asterisk is appended to the label.
   */
  mandatory: PropTypes.bool,
  /**
   * If true field was in focus.
   */
  touched: PropTypes.bool
}

export default StatedValue
