import PropTypes from 'prop-types'
import React from 'react'

import StyledSignalBox, {ALLOWED_CONDITIONS} from './StyledSignalBox'
import Typography from '../Typography'
import {design} from '../utilStyles'

/**
 * Emphasize important information by context. Group them by utilizing several instances of <SignalBox/>.
 */
const SignalBox = props =>
  <StyledSignalBox condition={props.condition}>
    {props.title && <Typography.H5>{props.title}</Typography.H5>}
    {React.Children.map(props.children, child => React.cloneElement(child))}
    {props.meta && <Typography.Small>{props.meta}</Typography.Small>}
  </StyledSignalBox>

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
