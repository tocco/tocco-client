import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'

import StyledIcon from './StyledIcon'
import {
  stylingAnimation,
  stylingPosition
} from '../utilStyles'

const getClassName = (icon, animation) => {
  let cls = classNames({
    'glyphicon': icon.startsWith('glyphicon-'),
    'fa': icon.startsWith('fa-')
  }, icon, 'icon')

  if (animation === stylingAnimation.SPIN) {
    cls = classNames(cls, 'fa-spin')
  }

  return cls
}

/**
 * Utilize <Icon> to create additional meaning or to omit text labels. Every chosen
 * icon must be concise and convey the same meaning in all contexts.
 */
const Icon = props => {
  return (
    <StyledIcon
      className={getClassName(props.icon, props.animation)}
      dense={props.dense}
      onClick={props.onClickFunction}
      onMouseEnter={props.onMouseEnterFunction}
      onMouseLeave={props.onMouseLeaveFunction}
      onMouseDown={props.onMouseDownFunction}
      position={props.position}
    />
  )
}

Icon.defaultProps = {
  animation: stylingAnimation.NONE,
  position: stylingPosition.SOLELY
}

Icon.propTypes = {
  /**
  * Animate Icon. Default value is 'none'.
  */
  animation: PropTypes.oneOf([stylingAnimation.NONE, stylingAnimation.SPIN]),
  /**
   * Display an icon. Utilize Glyphicon of Bootstrap 3.7 or Font Awesome 4.7 by setting
   * specific classname (e.g. "bars")
   * https://getbootstrap.com/docs/3.3/components/#glyphicons or https://fontawesome.com/v4.7.0/icons/
   */
  icon: PropTypes.string.isRequired,
  /**
   * If true, button occupies less space. It should only used for crowded areas like tables and only if necessary.
   */
  dense: PropTypes.bool,
  /**
   * If icon is positioned next to text or not specifiy it to control flow. Default value is 'before'.
   */
  position: PropTypes.oneOf([
    stylingPosition.AFTER,
    stylingPosition.BEFORE,
    stylingPosition.BETWEEN,
    stylingPosition.SOLELY]),
  onClickFunction: PropTypes.func,
  onMouseEnterFunction: PropTypes.func,
  onMouseLeaveFunction: PropTypes.func,
  onMouseDownFunction: PropTypes.func
}

export default Icon
