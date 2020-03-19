import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import {Manager, Popper, Reference} from 'react-popper'

import {
  StyledArrow,
  StyledBox,
  StyledBoxWrapper
} from './StyledPopover'

const placements = {
  TOP: 'top',
  BOTTOM: 'bottom'
}

class Popover extends React.Component {
  constructor(props) {
    super(props)
    this.state = {showToolTip: false}
  }

  setToolTipVisibility = visible => {
    this.setState({
      showToolTip: visible
    })
  }

  handleMouseEnter = () => {
    this.setToolTipVisibility(true)
  }

  handleMouseLeave = () => {
    this.setToolTipVisibility(false)
  }

  render() {
    const {
      children,
      content,
      isPlainHtml,
      rimless,
      placement,
      spacer
    } = this.props

    return <Manager>
      <Reference>
        {({ref}) => (
          <span
            onMouseOut={this.handleMouseLeave}
            onMouseOver={this.handleMouseEnter}
            ref={ref}
            style={{display: 'inline-block'}}
          >
            {children}
          </span>
        )}
      </Reference>
      {this.state.showToolTip && content
      && ReactDOM.createPortal(
        <Popper
          placement={placement}
        >
          {({ref, style, placement, arrowProps}) => (
            <StyledBoxWrapper
              ref={ref}
              style={style}
              spacer={spacer}
            >
              <StyledBox
                isPlainHtml={isPlainHtml}
                rimless={rimless}
              >
                {content}
              </StyledBox>
              <StyledArrow
                ref={arrowProps.ref}
                data-placement={placement}
                style={arrowProps.style}
              />
            </StyledBoxWrapper>
          )}
        </Popper>
        , document.body)}
    </Manager>
  }
}

Popover.defaultProps = {
  isPlainHtml: true,
  rimless: false,
  placement: placements.TOP,
  spacer: 10
}

Popover.propTypes = {
  /**
   * Content in the popover.
   */
  content: PropTypes.node,
  /**
   * Reference to the popover.
   */
  children: PropTypes.node,
  /**
   * Remove space between content and border if useful (e.g. content is an image only). Default is {false}.
   */
  rimless: PropTypes.bool,
  /**
   * Add typographic styles for nested content. If content is already completely
   * styled disable this option (e.g. styled-components). Default is {true}.
   */
  isPlainHtml: PropTypes.bool,
  /**
   * Minimal distance between popper and viewport edge in pixels. Default is '10'.
   */
  spacer: PropTypes.number,
  /**
   * Content of the popover
   */
  placement: PropTypes.oneOf(Object.values(placements))
}

export default Popover
