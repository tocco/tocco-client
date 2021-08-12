import PropTypes from 'prop-types'
import React from 'react'

import StyledPanelHeaderFooter, {StyledIconWrapper} from './StyledPanelHeaderFooter'
import Icon from '../Icon'

/**
 * <Panel.Header/> and <Panel.Footer/> contain by default a button to toggle the visibility state of <Panel.Body>.
 * Header and footer can contain any content. If both are displayed is up to the implementer.
 */
const PanelHeaderFooter = ({
  children,
  isFramed,
  isOpen,
  isToggleable,
  showToggler,
  toggleOpenState,
  options
}) => (
  <StyledPanelHeaderFooter
    isFramed={isFramed}
    isOpen={isOpen}
    onClick={toggleOpenState}
  >
    <div>
      {React.Children.map(children, child => React.cloneElement(child))}
    </div>
    {isToggleable
    && showToggler
    && <StyledIconWrapper>
      <Icon
        icon={isOpen ? 'chevron-up' : 'chevron-down'}
        onClick={toggleOpenState}
        title={isOpen ? options.collapseButtonText : options.unfoldButtonText}
      />
    </StyledIconWrapper>
    }
  </StyledPanelHeaderFooter>
)

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
   * Boolean to control if <Panel.Header/>, <Panel.Body/> and <Panel.Footer/> is initially opened.
   * Value is always overridden by parent element.
   */
  isFramed: PropTypes.bool,
  /**
   * Boolean to control if <Panel.Body/> is initially opened. Value is always overridden by parent element.
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
