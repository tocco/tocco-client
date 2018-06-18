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
      // eslint-disable-next-line
      children,
      // eslint-disable-next-line
      isOpen,
      // eslint-disable-next-line
      isToggleable,
      showToggler,
      // eslint-disable-next-line
      toggleOpenState
    } = this.props

    return (
      <StyledPanelHeaderFooter>
        <div>
          {React.Children.map(children, child => React.cloneElement(child))}
        </div>
        {isToggleable
          && showToggler
          && <Button
            icon={isOpen ? 'fa-minus' : 'fa-plus'}
            onClick={toggleOpenState}
            title={isOpen ? this.props.options.collapseButtonText : this.props.options.unfoldButtonText}
            iconPosition="solely"
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
  /**
   * Show or hide button if needed. Default value is 'true'.
   */
  showToggler: PropTypes.bool,
  options: PropTypes.shape({
    collapseButtonText: PropTypes.string,
    unfoldButtonText: PropTypes.string
  })
}

export default PanelHeaderFooter
