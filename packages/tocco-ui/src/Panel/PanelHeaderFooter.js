import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import Button, {StyledButton} from '../Button'

const StyledPanelHeaderFooter = styled.div`
  && {
    display: flex;

    > div {
      flex: 1 1 auto;
    }

    ${StyledButton} {
      margin-left: auto;
      align-self: flex-start;
    }
  }
`

class PanelHeaderFooter extends React.Component {
  render() {
    const {
      // eslint-disable-next-line
      children,
      // eslint-disable-next-line
      isOpen,
      // eslint-disable-next-line
      isToggleable,
      showToggler,
      // eslint-disable-next-line
      toogleOpenState
    } = this.props

    return (
      <StyledPanelHeaderFooter>
        <div>
          { React.Children.map(children, child => {
            return React.cloneElement(child)
          })}
        </div>
        { isToggleable
          && showToggler
          && <Button
            icon={isOpen ? 'fa-minus' : 'fa-plus'}
            onClick={() => toogleOpenState()}
            title={isOpen ? 'Weitere Informationen verbergen' : 'Weitere Informationen anzeigen'}
            iconPosition="solely"
          />
        }
      </StyledPanelHeaderFooter>
    )
  }
}

PanelHeaderFooter.defaultProps = {
  showToggler: true
}

PanelHeaderFooter.propTypes = {
  showToggler: PropTypes.bool
}

export {
  PanelHeaderFooter as default,
  StyledPanelHeaderFooter
}
