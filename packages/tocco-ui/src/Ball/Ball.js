import PropTypes from 'prop-types'
import React from 'react'

import Icon from '../Icon'
import StyledBall from './StyledBall'
import {design} from '../utilStyles'

/**
 * Use <Ball> to trigger any actions in a nice round way.
 */
const Ball = props => (
  <StyledBall type="button" {...props}>
    <Icon icon={props.icon}/>
  </StyledBall>
)

Ball.propTypes = {
  /**
   * If true, the button can not be triggered. Disable a button rather than hide it temporarily.
   */
  'disabled': PropTypes.bool,
  /**
   * Display an icon alongside button label. It is possible to omit label text if an icon is chosen.
   * See Icon component for more information.
   */
  'icon': PropTypes.string.isRequired,
  /**
   * Specify color palette. Default value is 'base'.
   */
  'ink': design.inkPropTypes,
  /**
   * Look of button. Default value is 'flat'.
   */
  'look': PropTypes.oneOf([
    design.look.FLAT,
    design.look.RAISED
  ]),
  /**
   * Function that will be triggered on click event.
   */
  'onClick': PropTypes.func,
  /**
   * Describe button action in detail to instruct users. It is shown as popover on mouse over.
   */
  'title': PropTypes.string,
  /**
   * Tabindex indicates if the button can be focused and if/where it participates
   * in sequential keyboard navigation.
   */
  'tabIndex': PropTypes.number,
  /**
   * cypress selector string
   */
  'data-cy': PropTypes.string
}

export default Ball
