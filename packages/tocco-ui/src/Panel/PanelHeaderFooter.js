import PropTypes from 'prop-types'
import React from 'react'

import StyledPanelHeaderFooter from './StyledPanelHeaderFooter'
import Button from '../Button'

/**
 * <PanelHeader/> and <PanelFooter/> contain by default a button to toggle the visibility state of <PanelBody>.
 * Header and footer can contain any content. If both are displayed is up to the implementer.
 */
class PanelHeaderFooter extends React.Component {
  render() {
    const {
      children,
      isFramed,
      isOpen,
      isToggleable,
      showToggler,
      toggleOpenState
    } = this.props

    return (
      <StyledPanelHeaderFooter
        isFramed={isFramed}
        isOpen={isOpen}
      >
        <div>
          {React.Children.map(children, child => React.cloneElement(child))}
        </div>
        {isToggleable
          && showToggler
          && <Button
            icon={isOpen ? 'fa-minus' : 'fa-plus'}
            onClick={toggleOpenState}
            title={isOpen ? this.props.options.collapseButtonText : this.props.options.unfoldButtonText}
            iconPosition="sole"
          />
        }
      </StyledPanelHeaderFooter>
    )
  }
}

PanelHeaderFooter.defaultProps = {
  showToggler: true,
  options: {
    collapseButtonText: 'Hide information',
    unfoldButtonText: 'Show more information'
  }
}

PanelHeaderFooter.propTypes = {
  children: PropTypes.node,
  /**
   * Boolean to control if <PanelHeader/>, <PanelBody/> and <PanelFooter/> is initially opened.
   * Value is always overridden by parent element.
   */
  isFramed: PropTypes.bool,
  /**
   * Boolean to control if <PanelBody/> is initially opened. Value is always overridden by parent element.
   */
  isOpen: PropTypes.bool,
  /**
   * Boolean to control if body can be opened or closed. Value is always overridden by parent element.
   */
  isToggleable: PropTypes.bool,
  /**
   * Show or hide button if needed. Default value is 'true'.
   */
  showToggler: PropTypes.bool,
  /**
   * Function executed on button click to control accordion. Is always passed from parent.
   */
  toggleOpenState: PropTypes.func,
  /* Define display text for buttons as option object (keys: collapseButtonText, unfoldButtonText). */
  options: PropTypes.shape({
    collapseButtonText: PropTypes.string,
    unfoldButtonText: PropTypes.string
  })
}

export default PanelHeaderFooter
