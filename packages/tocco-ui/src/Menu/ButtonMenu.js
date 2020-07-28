import React, {useRef, useState} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {Menu, Icon, Button, ButtonGroup} from '../'

const IconWrapper = styled.div`
  margin-left: 10px;
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
      <ButtonGroup ref={referenceElement}>
        <Button {...props.buttonProps || {}} onClick={props.onClick} label={props.label}/>
        <Button icon={angleIcon} onClick={handleClick} {...props.buttonProps || {}} />
      </ButtonGroup>
      {getMenu}
    </>
  }

  return <>
    <Button
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
  onClick: PropTypes.func,
  /**
   * Will be shown on the button
   */
  label: PropTypes.string,
  /**
   * Will be passed to the underlying Button
   */
  buttonProps: PropTypes.object,
  /**
   * Tree of <MenuItem>
   */
  children: PropTypes.any,
  /**
   * Callback when the menu is opened (only called once)
   */
  onOpen: PropTypes.func
}

export default ButtonMenu
