import PropTypes from 'prop-types'
import React from 'react'

import Icon from '../Icon'
import StyledSignalListItem from './StyledSignalListItem'
import {
  conditionPropTypes,
  stylingPosition,
  stylingCondition
} from '../utilStyles'

const ICONS = {
  [stylingCondition.BASE]: {unicode: '\u2022'},
  [stylingCondition.DANGER]: {icon: 'fa-times'},
  [stylingCondition.PRIMARY]: {unicode: '\u2022'},
  [stylingCondition.SUCCESS]: {icon: 'fa-check'},
  [stylingCondition.WARNING]: {icon: 'fa-exclamation-triangle'}
}

const getIcon = props => {
  const icon = ICONS[props.condition]
  return icon || {unicode: '\u2022'}
}

/**
 * Signalize single condition by icon and color. It must be wrapped by <SignalList/>
 */
const SignalListItem = props =>
  <StyledSignalListItem condition={props.condition}>
    <Icon {...getIcon(props)} position={stylingPosition.SOLE}/>
    {props.label}
    {React.Children.map(props.children, child => React.cloneElement(child))}
  </StyledSignalListItem>

SignalListItem.defaultProps = {
  condition: stylingCondition.BASE
}

SignalListItem.propTypes = {
  /**
   * Visible text. Default is an empty string.
   */
  label: PropTypes.string.isRequired,
  children: PropTypes.node,
  /**
   * Color and icon is set according condition. Default value is 'base'.
   * Possible values: base|danger|primary|success|warning
   */
  condition: conditionPropTypes(ICONS)
}

export default SignalListItem
