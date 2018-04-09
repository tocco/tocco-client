import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import {theme} from 'styled-system'
import {getElevation} from '../utilStyles'

export const ButtonGroupStyles = styled.div`
  && {
    display: flex;
    flex-wrap: no-wrap;
    width: fit-content;

    border-radius: ${props => props.melt === true ? theme('radii.3') : 0};
    ${props => getElevation(props, props.look === 'raised' && props.melt === true ? 1 : 0)}
  }
`

/**
 * ButtonGroup wraps Buttons and controls flow and space.
 */
const ButtonGroup = props => {
  return (
    <ButtonGroupStyles look={props.look} melt={props.melt}>
      { // eslint-disable-next-line
        React.Children.map(props.children, child => {
          return React.cloneElement(child, {look: props.look, buttonGroupInk: props.ink, buttonGroupMelt: props.melt})
        })}
    </ButtonGroupStyles>
  )
}

ButtonGroup.defaultProps = {
  ink: 'base',
  look: 'flat',
  melt: false
}

ButtonGroup.propTypes = {
  /**
   * Set color palette for all Buttons globally. Ink can be overwritten on Buttons individually.
   * Default value is 'base'. Possible values: base|primary
   */
  ink: PropTypes.oneOf(['base', 'primary']),
  /**
   * Set style for all Buttons globally. Default value is 'flat'. Possible values: flat|raised
   */
  look: PropTypes.oneOf(['flat', 'raised']),
  /**
   * If true Buttons melt visually into one. Default value is 'false'.
   */
  melt: PropTypes.bool
}

export default ButtonGroup
