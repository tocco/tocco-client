import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'

import StyledIcon from './StyledIcon'
import {
  animationPropTypes,
  positionPropTypes,
  stylingAnimation,
  stylingPosition
} from '../utilStyles'

const getClassName = (icon, animation) => {
  if (icon) {
    return classNames({
      'glyphicon': icon.startsWith('glyphicon-'),
      'fa': icon.startsWith('fa-'),
      'fa-spin': animation === stylingAnimation.SPIN
    }, icon, 'icon')
  } else {
    return 'fa'
  }
}

/**
 * Utilize <Icon> to create additional meaning or to omit text labels. Every chosen
 * icon must be concise and convey the same meaning in all contexts.
 */
const Icon = props => {
  return (
    <StyledIcon
      animation={props.animation}
      className={getClassName(props.icon, props.animation)}
      dense={props.dense}
      position={props.position}
    >
      {props.unicode}
    </StyledIcon>
  )
}

Icon.defaultProps = {
  animation: stylingAnimation.NONE,
  position: stylingPosition.SOLE
}

Icon.propTypes = {
  /**
  * Animate Icon. Default value is 'none'.
  */
  animation: animationPropTypes,
  /**
   * Display an icon. Utilize Glyphicon of Bootstrap 3.7 or Font Awesome 4.7 by setting
   * specific classname (e.g. "bars")
   * https://getbootstrap.com/docs/3.3/components/#glyphicons or https://fontawesome.com/v4.7.0/icons/
   */
  icon: PropTypes.string,
  /**
   * If true, button occupies less space. It should only used for crowded areas like tables and only if necessary.
   */
  dense: PropTypes.bool,
  /**
   * Specify if icon is positioned next to text or not to control spacing. Default value is 'prepend'.
   */
  position: positionPropTypes,
  /*
   * Display one or more unicode characters. Use unicode escape string (e.g. \u2022).
   * Font Awesome styling is used. If prop icon and unicode is used together, icon prepend unicode characters.
   */
  unicode: PropTypes.string
}

export {
  Icon as default,
  StyledIcon
}
