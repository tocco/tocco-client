import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'

import styled from 'styled-components'
import {theme} from 'styled-system'
import {stylingAnimation, stylingPosition} from '../utilStyles'

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

const getSpacing = props => {
  let left = 0
  let right = 0

  const space = (props.dense) ? theme('space.1')(props) : theme('space.3')(props)

  if (props.position === stylingPosition.AFTER || props.position === stylingPosition.BETWEEN) {
    left = space
  }

  if (props.position === stylingPosition.BEFORE || props.position === stylingPosition.BETWEEN) {
    right = space
  }

  return `
    margin: 0 ${right} 0 ${left};
  `
}

const IconStyles = styled.i`
  && {
    padding: 0;
    ${props => getSpacing(props)}
  }
`

const Icon = props => {
  return (
    <IconStyles
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
  * Animate the Icon. Default value is 'none'. Possible values: none|spin
  */
  animation: PropTypes.oneOf([stylingAnimation.NONE, stylingAnimation.SPIN]),
  /**
   * Integrate an icon into the button. Set the specific class only from
   * https://getbootstrap.com/docs/3.3/components/#glyphicons or https://fontawesome.com/v4.7.0/icons/
   */
  icon: PropTypes.string.isRequired,
  /**
   * If true, smaller spacings are used.
   */
  dense: PropTypes.bool,
  /**
   * Add spacing according position. Default value is 'none'. Possible values: after|before|between|none
   */
  position: PropTypes.oneOf([
    stylingPosition.AFTER,
    stylingPosition.BEFORE,
    stylingPosition.BETWEEN,
    stylingPosition.SOLELY]),

  // TODO desribe props
  onClickFunction: PropTypes.func,
  onMouseEnterFunction: PropTypes.func,
  onMouseLeaveFunction: PropTypes.func,
  onMouseDownFunction: PropTypes.func
}

export default Icon
