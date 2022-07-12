import PropTypes from 'prop-types'
import React from 'react'

import Typography from '../Typography'
import {design} from '../utilStyles'
import StyledSignalBox, {ALLOWED_CONDITIONS} from './StyledSignalBox'

/**
 * Emphasize important information by context. Group them by utilizing several instances of <SignalBox/>.
 */
const SignalBox = ({condition, title, children, meta}) => (
  <StyledSignalBox condition={condition}>
    {title && <Typography.H5>{title}</Typography.H5>}
    {React.Children.map(children, child => React.cloneElement(child))}
    {meta && <Typography.Small>{meta}</Typography.Small>}
  </StyledSignalBox>
)

SignalBox.defaultProps = {
  condition: design.condition.BASE
}

SignalBox.propTypes = {
  /**
   * Prefer <SignalList.List/> and <SignalList.Item/> to list items over any other typographic component.
   */
  children: PropTypes.node,
  /**
   * Background is colorized according condition. Default value is 'base'.
   * Possible values: base|danger|success|warning
   */
  condition: PropTypes.oneOf(ALLOWED_CONDITIONS),
  /**
   * Add loosely related but still important information as meta text (e.g. date, id, type).
   */
  meta: PropTypes.string,
  /**
   * Summarize information from whole signal box concise.
   */
  title: PropTypes.string
}

export default SignalBox
