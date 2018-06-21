import PropTypes from 'prop-types'
import React from 'react'

import StyledSignalBox, {ALLOWED_CONDITIONS} from './StyledSignalBox'
import {H5, Small} from '../Typography'
import {stylingCondition} from '../utilStyles'

/**
 * Emphasize important information by context. Group them by utilizing several instances of <SignalBox/>.
 */
const SignalBox = props =>
  <StyledSignalBox condition={props.condition}>
    {props.title && <H5>{props.title}</H5>}
    {React.Children.map(props.children, child => React.cloneElement(child))}
    {props.meta && <Small>{props.meta}</Small>}
  </StyledSignalBox>

SignalBox.defaultProps = {
  condition: stylingCondition.BASE
}

SignalBox.propTypes = {
  /**
   * Prefer <SignalList/> and <SignalListItem/> to list items over any other typographic component.
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
