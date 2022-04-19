import PropTypes from 'prop-types'
import React, {useState} from 'react'

import StyledPanelGroup from './StyledPanelGroup'

const PanelGroup = ({initialOpenPanelIndex, children}) => {
  const [openPanelIndex, setOpenPanelIndex] = useState(initialOpenPanelIndex)

  const onToggle = (index, open) => {
    setOpenPanelIndex(open === true ? index : undefined)
  }

  return (
    <StyledPanelGroup>
      {React.Children.map(children, (child, i) =>
        React.cloneElement(child, {
          controlledIsOpen: openPanelIndex === i,
          onToggle: open => onToggle(i, open)
        })
      )}
    </StyledPanelGroup>
  )
}

PanelGroup.propTypes = {
  children: PropTypes.node,
  /**
   * Define a panel which is initially opened (zero-based index).
   */
  initialOpenPanelIndex: PropTypes.number
}

export default PanelGroup
