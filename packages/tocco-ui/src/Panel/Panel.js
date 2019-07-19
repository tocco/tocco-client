import React, {useState} from 'react'
import PropTypes from 'prop-types'

import StyledPanel from './StyledPanel'

/**
 * <Panel/> is used to conceal and display related content alternating by interaction and to
 * emphasize close relationship of content.
 */
const Panel = ({
  children,
  isFramed = true,
  controlledIsOpen,
  isOpenInitial = true,
  isToggleable = true,
  onToggle
}) => {
  const [isOpen, setIsOpen] = useState(isOpenInitial)

  const controlled = typeof controlledIsOpen === 'boolean'

  const toggleOpenState = () => {
    if (isToggleable) {
      if (controlled) {
        if (typeof onToggle === 'function') {
          onToggle(!controlledIsOpen)
        }
      } else {
        setIsOpen(!isOpen)
      }
    }
  }

  return (
    <StyledPanel
      isFramed={isFramed}
    >
      {
        React.Children.map(children, child =>
          React.cloneElement(child, {
            isFramed,
            isOpen: controlled ? controlledIsOpen : isOpen,
            isToggleable,
            toggleOpenState: toggleOpenState
          })
        )
      }
    </StyledPanel>
  )
}

Panel.propTypes = {
  children: PropTypes.node,
  /**
   * Boolean to control if <Panel.Header/>, <Panel.Body/> and <Panel.Footer/> is bordered.
   * Default value is 'true'.
   */
  isFramed: PropTypes.bool,
  /**
   * Boolean to control if <Panel.Body/> is opened or not. If not set, the Panel manages it sate by itself.
   */
  controlledIsOpen: PropTypes.bool,
  /**
   * If component is not controlled a initial value can be set
   */
  isOpenInitial: PropTypes.bool,
  /**
   * Boolean to control if body can be opened or closed. Default value is 'true'.
   */
  isToggleable: PropTypes.bool,
  /**
   * Function is triggered if panel is opened or closed.
   */
  onToggle: PropTypes.func
}

export default Panel
