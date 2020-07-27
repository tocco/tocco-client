import React, {useRef, useState} from 'react'
import PropTypes from 'prop-types'

import {Ball} from '../'
import {Menu} from './'

/**
 * Ball Button with a menu that pops out on click.
 */
const BallMenu = props => {
  const ballEl = useRef(null)
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

  return <>
    <Ball {...props.buttonProps} onClick={handleClick} ref={ballEl}/>
    <Menu
      referenceElement={ballEl.current}
      open={menuOpen}
      onClose={handleClose}
    >
      {props.children}
    </Menu>
  </>
}

BallMenu.propTypes = {
  /**
   * Tree of <MenuItem>
   */
  children: PropTypes.element.isRequired,
  /**
   * Object of properties as described in Ball component
   */
  buttonProps: PropTypes.object,
  /**
   * Callback when the menu is opened (only called once)
   */
  onOpen: PropTypes.func
}

export default BallMenu
