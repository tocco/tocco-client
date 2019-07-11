import PropTypes from 'prop-types'
import React from 'react'

import StyledPanelGroup from './StyledPanelGroup'

class PanelGroup extends React.Component {
  state = {
    openPanelId: this.props.openPanelId >= 0 ? this.props.openPanelId : -1
  }

  toggleOpenStateAsGroup = panelId => {
    this.setState({openPanelId: panelId})
  }

  render() {
    return (
      <StyledPanelGroup>
        {
          React.Children.map(this.props.children, (child, i) =>
            React.cloneElement(child, {
              isOpen: this.state.openPanelId === i,
              panelId: i,
              toggleOpenStateAsGroup: this.toggleOpenStateAsGroup
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
  openPanelId: PropTypes.number
}

export default PanelGroup
