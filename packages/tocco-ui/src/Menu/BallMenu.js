import React, {useRef, useState} from 'react'
import PropTypes from 'prop-types'

import {Ball} from '../'
import {Menu} from './'

/**
 * Ball Button with a menu that pops out on click.
 */
const BallMenu = ({buttonProps, onOpen, children}) => {
  const ballEl = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [onOpenCalled, setOnOpenCalled] = useState(false)

  const handleClick = e => {
    setMenuOpen(!menuOpen)
    e.stopPropagation()

    if (onOpen && !onOpenCalled) {
      onOpen()
      setOnOpenCalled(true)
    }
  }

  const handleClose = () => {
    setMenuOpen(false)
  }

  return <>
    <Ball {...buttonProps} onClick={handleClick} ref={ballEl}/>
    {menuOpen && <Menu
      referenceElement={ballEl.current}
      open={menuOpen}
      onClose={handleClose}
    >
      {children}
    </Menu>}
  </>
}

BallMenu.propTypes = {
  /**
   * Tree of <MenuItem>
   */
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired,
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
