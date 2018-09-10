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
  [stylingCondition.BASE]: false,
  [stylingCondition.PRIMARY]: false,
  [stylingCondition.DANGER]: 'times',
  [stylingCondition.SUCCESS]: 'check',
  [stylingCondition.WARNING]: 'exclamation-triangle'
}

const getIcon = props => {
  const icon = ICONS[props.condition]
  if (icon) {
    return <Icon icon={icon} position={stylingPosition.SOLE}/>
  } else {
    return <i>{'\u2022'}</i>
  }
}

/**
 * Signalize single condition by icon and color. It must be wrapped by <SignalList/>
 */
const SignalListItem = props =>
  <StyledSignalListItem condition={props.condition}>
    {getIcon(props)}
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
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]).isRequired,
  children: PropTypes.node,
  /**
   * Color and icon is set according condition. Default value is 'base'.
   * Possible values: base|danger|primary|success|warning
   */
  condition: conditionPropTypes(ICONS)
}

export default SignalListItem
