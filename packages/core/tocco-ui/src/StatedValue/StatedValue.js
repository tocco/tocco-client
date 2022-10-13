import PropTypes from 'prop-types'
import FocusWithin from 'react-simple-focus-within'
import {js, html} from 'tocco-util'

import {design} from '../utilStyles'
import ErrorList from './ErrorList'
import {
  StyledStatedValueBox,
  StyledStatedValueDescription,
  StyledStatedValueError,
  StyledStatedValueLabel,
  StyledStatedValueWrapper,
  StyledLabelWrapper
} from './StyledStatedValue'

const detectSignal = (dirty, hasError, mandatory, hasValue) => {
  if (hasError) {
    return design.condition.DANGER
  } else if (dirty) {
    return design.condition.INFO
  } else if (mandatory && !hasValue) {
    return design.condition.WARNING
  }
}

/**
 * Wrap <EditableValue> and <FormattedValUe> in <StatedValue> to describe it
 * and signal conditions.
 */
const StatedValue = ({
  children,
  description,
  dirty,
  isDisplay,
  error,
  hasValue,
  id,
  label,
  mandatory,
  mandatoryTitle,
  immutable,
  touched,
  signal: signalProp
}) => {
  const showError = !immutable && touched && error && Object.keys(error).length > 0
  const labelAlt = `${js.adjustedHTMLString(label)}${mandatory && mandatoryTitle ? `, ${mandatoryTitle}` : ''}`
  const signal = signalProp || detectSignal(dirty, showError, mandatory, hasValue)
  const statedValueLabelText = {__html: `${html.sanitizeHtml(label)}${mandatory ? ' *' : ''}`}
  const forAttr = !isDisplay && !immutable && {htmlFor: id}

  return (
    <FocusWithin>
      {({getRef}) => (
        <StyledStatedValueWrapper ref={getRef}>
          <StyledStatedValueBox hasValue={hasValue} immutable={immutable} isDisplay={isDisplay} signal={signal}>
            {children}
            {label && (
              <StyledLabelWrapper>
                <StyledStatedValueLabel
                  {...forAttr}
                  hasValue={hasValue}
                  dirty={dirty}
                  title={labelAlt}
                  immutable={immutable}
                  isDisplay={isDisplay}
                  signal={signal}
                >
                  <span dangerouslySetInnerHTML={statedValueLabelText} />
                </StyledStatedValueLabel>
              </StyledLabelWrapper>
            )}
          </StyledStatedValueBox>
          {description && <StyledStatedValueDescription>{description}</StyledStatedValueDescription>}
          {showError && (
            <StyledStatedValueError>
              <ErrorList error={error} />
            </StyledStatedValueError>
          )}
        </StyledStatedValueWrapper>
      )}
    </FocusWithin>
  )
}

StatedValue.propTypes = {
  /**
   * A component to enter or display data.
   */
  children: PropTypes.node,
  /**
   * Visualize as display and not as field.
   */
  isDisplay: PropTypes.bool,
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
  error: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.node, PropTypes.string]))),
  /**
   * Force label on secondaryPosition.
   */
  fixLabel: PropTypes.bool,
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
   * Append to label's alternative text.
   */
  mandatoryTitle: PropTypes.string,
  /**
   * Determines if value is editable
   */
  immutable: PropTypes.bool,
  /**
   * Pass a valid signal condition to omit auto detection
   */
  signal: PropTypes.string,
  /**
   * If true field was in focus.
   */
  touched: PropTypes.bool
}

export default StatedValue
