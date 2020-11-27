import React, {useState, useRef, useEffect} from 'react'
import PropTypes from 'prop-types'
import {usePopper} from 'react-popper'
import styled from 'styled-components'
import ReactDOM from 'react-dom'

import {theme} from '../'

const StyledPopper = styled.div`
  box-shadow: 0 0 5px rgba(0, 0, 0, .3);
  border: 1px solid ${theme.color('secondaryLight')};
  z-index: 1001;
`

/**
 * Menu realised with popper.
 */
const Menu = ({referenceElement, onClose, open, children}) => {
  const thisEl = useRef(null)
  const [popperElement, setPopperElement] = useState(null)

  const handleClickOutside = e => {
    if (thisEl && thisEl.current && !thisEl.current.contains(e.target)
      && referenceElement && !referenceElement.contains(e.target)) {
      onClose()
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [referenceElement])

  const {styles, attributes} = usePopper(referenceElement, popperElement, {
    placement: 'bottom-start',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 5]
        }
      }
    ]
  }
  )

  if (!open) {
    return null
  }

  return ReactDOM.createPortal(
    <div ref={thisEl}>
      {children && <StyledPopper ref={setPopperElement} style={styles.popper} {...attributes.popper}>
        {React.Children.map(children, child => child && React.cloneElement(child, {onClose: onClose}))}
      </StyledPopper>}
    </div>
    , document.body)
}

Menu.propTypes = {
  /**
   * Element to attach popper menu to
   */
  referenceElement: PropTypes.any,
  /**
   * Will be called if menu is closed
   */
  onClose: PropTypes.func.isRequired,
  /**
   * Tree of <MenuItems>
   */
  children: PropTypes.node,
  /**
   * Whether menu is open or not
   */
  open: PropTypes.bool
}

export default Menu
