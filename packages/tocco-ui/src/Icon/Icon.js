import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'

import styled from 'styled-components'
import {theme} from 'styled-system'

const getClassName = (icon, animation) => {
  let cls = classNames({
    'glyphicon': icon.startsWith('glyphicon-'),
    'fa': icon.startsWith('fa-')
  }, icon, 'icon')

  if (animation === 'spin') {
    cls = classNames(cls, 'fa-spin')
  }

  return cls
}

const getSpacing = props => {
  let left = 0
  let right = 0

  const space = (props.dense) ? theme('space.1')(props) : theme('space.3')(props)

  if (props.position === 'after' || props.position === 'between') {
    left = space
  }

  if (props.position === 'before' || props.position === 'between') {
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
      position={props.position}
    />
  )
}

Icon.defaultProps = {
  animation: 'none',
  position: 'solely'
}

Icon.propTypes = {
  /**
  * Animate the Icon. Default value is 'none'. Possible values: none|spin
  */
  animation: PropTypes.oneOf(['none', 'spin']),
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
  position: PropTypes.oneOf(['after', 'before', 'between', 'solely'])
}

export default Icon
