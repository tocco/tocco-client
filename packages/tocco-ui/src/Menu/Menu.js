import React, {useState, useRef, useEffect} from 'react'
import PropTypes from 'prop-types'
import {usePopper} from 'react-popper'

import {StyledPopperWrapper, StyledPopper} from './StyledComponents'

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

  return (
    <StyledPopperWrapper ref={thisEl}>
      {children && <StyledPopper ref={setPopperElement} style={styles.popper} {...attributes.popper}>
        {React.Children.map(children, child => child && React.cloneElement(child, {onClose: onClose}))}
      </StyledPopper>}
    </StyledPopperWrapper>
  )
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
