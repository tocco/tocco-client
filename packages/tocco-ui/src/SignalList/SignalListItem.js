import PropTypes from 'prop-types'
import React from 'react'

import Icon from '../Icon'
import StyledSignalListItem from './StyledSignalListItem'
import {
  conditionPropTypes,
  stylingPosition,
  stylingCondition
} from '../utilStyles'

const getIcon = props => {
  switch (props.condition) {
    case stylingCondition.DANGER:
      return {icon: 'fa-times'}
    case stylingCondition.SUCCESS:
      return {icon: 'fa-check'}
    case stylingCondition.WARNING:
      return {icon: 'fa-exclamation-triangle'}
    case stylingCondition.PRIMARY:
    case stylingCondition.BASE:
      return {unicode: '\u2022'} // unicode bullet point
    default:
      // eslint-disable-next-line no-console
      console.warn('Be explicit by adding a case. You may want display a different character or an icon.')
      return {unicode: '\u2022'} // unicode bullet point
  }
}

/**
 * Signalize single condition by icon and color. It must be wrapped by <SignalList/>
 */
const SignalListItem = props =>
  <StyledSignalListItem condition={props.condition}>
    <Icon {...getIcon(props)} position={stylingPosition.BEFORE}/>
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
  condition: conditionPropTypes
}

export default SignalListItem
