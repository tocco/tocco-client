import React, {useRef, useState} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {Menu, Icon, Button} from '../'
import {StyledButtonGroup} from '../ButtonGroup'
import {StyledButton} from '../Button'
import {getInteractiveStyle} from '../utilStyles'

const IconWrapper = styled.div`
  margin-left: 8px;
`

const StyledMenuButtonGroup = styled(StyledButtonGroup)`
  ${props => {
    const style = getInteractiveStyle(props)
     return `
      ${StyledButton}{
        &:active,
        &[aria-pressed='true'] {
          background: ${style.activeBackgroundColor} !important;
        }
      }

      &:focus,
      &:hover {
        > ${StyledButton} {
          background: ${style.hoverBackgroundColor};
          color: ${style.hoverFontColor};
          :last-of-type {
             ${style.border === 'none'
                 ? `box-shadow: 1px 0 0 0 ${style.backgroundColor} inset;`
                 : `box-shadow: ${style.border}, 2px 0 0 0 ${style.hoverFontColor} inset;`
             }
          }
        }
      }
     `
  }
}
`

/**
 *  Button with a menu that pops out on click.
 */
const ButtonMenu = props => {
  const referenceElement = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [onOpenCalled, setOnOpenCalled] = useState(false)

  const handleClick = () => {
    setMenuOpen(!menuOpen)
    if (props.onOpen && !onOpenCalled) {
      props.onOpen()
      setOnOpenCalled(true)
    }
  }

  const handleClose = () => {
    setMenuOpen(false)
  }

  const angleIcon = menuOpen ? 'angle-up' : 'angle-down'

  const getMenu = <Menu
    referenceElement={referenceElement.current}
    open={menuOpen}
    onClose={handleClose}
  >
    {props.children}
  </Menu>

  if (props.onClick) {
    return <>
      <StyledMenuButtonGroup ref={referenceElement} {...props.buttonProps || {}}>
        <Button {...props.buttonProps || {}} onClick={props.onClick} label={props.label} data-cy={props['data-cy']}/>
        <Button icon={angleIcon} onClick={handleClick} {...props.buttonProps || {}} />
      </StyledMenuButtonGroup>
      {getMenu}
    </>
  }

  return <>
    <Button
      data-cy={props['data-cy']}
      {...props.buttonProps || {}} ref={referenceElement}
      onClick={handleClick}
    >
      {props.label}<IconWrapper><Icon icon={angleIcon}/></IconWrapper>
    </Button>
    {getMenu}
  </>
}

ButtonMenu.propTypes = {
  /**
   * Optional handler. If defined, a split button will be rendered
   */
  'onClick': PropTypes.func,
  /**
   * Will be shown on the button
   */
  'label': PropTypes.string,
  /**
   * Will be passed to the underlying Button
   */
  'buttonProps': PropTypes.object,
  /**
   * Tree of <MenuItem>
   */
  'children': PropTypes.any,
  /**
   * Callback when the menu is opened (only called once)
   */
  'onOpen': PropTypes.func,
  /**
   * cypress selector string
   */
  'data-cy': PropTypes.string
}

export default ButtonMenu
