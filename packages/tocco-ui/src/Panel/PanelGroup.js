import PropTypes from 'prop-types'
import React from 'react'

import StyledPanelGroup from './StyledPanelGroup'

class PanelGroup extends React.Component {
  state = {
    openPanelIndex: this.props.openPanelIndex
  }

  onToggle = (index, open) => {
    this.setState({
      openPanelIndex: open === true ? index : undefined
    })
  }

  render() {
    return (
      <StyledPanelGroup>
        {
          React.Children.map(this.props.children, (child, i) =>
            React.cloneElement(child, {
              controlledIsOpen: this.state.openPanelIndex === i,
              onToggle: this.onToggle.bind(this, i)
            })
          )
        }
      </StyledPanelGroup>
    )
  }
}

PanelGroup.propTypes = {
  children: PropTypes.node,
  /**
   * Define a panel which is initially opened (zero-based index).
   */
  openPanelIndex: PropTypes.number
}

export default PanelGroup
