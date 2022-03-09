import PropTypes from 'prop-types'
import React, {useCallback, useEffect, useRef, useState} from 'react'
import ReactDOM from 'react-dom'
import {usePopper} from 'react-popper'

import {StyledPopper, StyledPopperWrapper} from './StyledComponents'

/**
 * Menu realised with popper.
 */
const Menu = ({referenceElement, onClose, open, children}) => {
  const thisEl = useRef(null)
  const [popperElement, setPopperElement] = useState(null)
  const [bottom, setBottom] = useState(0)

  const handleClickOutside = useCallback(
    e => {
      if (
        thisEl &&
        thisEl.current &&
        !thisEl.current.contains(e.target) &&
        popperElement &&
        !popperElement.contains(e.target) &&
        referenceElement &&
        !referenceElement.contains(e.target)
      ) {
        onClose()
      }
    },
    [referenceElement, popperElement, onClose]
  )

  useEffect(() => {
    if (thisEl.current) {
      setBottom(thisEl.current.getBoundingClientRect().bottom)
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [handleClickOutside])

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
  })

  if (!open) {
    return null
  }

  return (
    <StyledPopperWrapper ref={thisEl}>
      {children &&
        ReactDOM.createPortal(
          <StyledPopper ref={setPopperElement} style={styles.popper} {...attributes.popper} rectBottom={bottom}>
            {React.Children.map(children, child => child && React.cloneElement(child, {onClose: onClose}))}
          </StyledPopper>,
          document.body
        )}
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
