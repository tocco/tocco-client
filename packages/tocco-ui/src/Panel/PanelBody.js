import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const StyledPanelBody = styled.div`
  display: ${props => props.isOpen ? 'block' : 'none'};
`

class PanelBody extends React.Component {
  render() {
    const {
      // eslint-disable-next-line
      children,
      isOpen
    } = this.props

    return (
      <StyledPanelBody
        isOpen={isOpen}>
        { // eslint-disable-next-line
          React.Children.map(children, child => {
            return React.cloneElement(child)
          })
        }
      </StyledPanelBody>
    )
  }
}

PanelBody.propTypes = {
  isOpen: PropTypes.bool
}

export {
  PanelBody as default,
  StyledPanelBody
}
