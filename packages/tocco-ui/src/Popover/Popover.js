import React, {useState} from 'react'
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
  BOTTOM: 'bottom',
  RIGHT: 'right'
}

const Popover = ({
  children,
  content,
  isPlainHtml,
  rimless,
  placement
}) => {
  const [showToolTip, setShowToolTip] = useState(false)

  const handleMouseEnter = () => setShowToolTip(true)
  const handleMouseLeave = () => setShowToolTip(false)

  const modifiers = [
    {
      name: 'offset',
      options: {
        offset: [0, 8]
      }
    },
    {
      name: 'preventOverflow',
      options: {
        padding: 10
      }
    }
  ]

  return (
    <Manager>
      <Reference>
        {({ref}) => (
          <span
            onMouseOut={handleMouseLeave}
            onMouseOver={handleMouseEnter}
            ref={ref}
          >
            {children}
          </span>
        )}
      </Reference>
      {showToolTip && content
      && ReactDOM.createPortal(
        <Popper
          placement={placement}
          modifiers={modifiers}
        >
          {({ref, style, placement, arrowProps}) => (
            <StyledBoxWrapper
              ref={ref}
              style={style}
              rimless={rimless}
              placement={placement}
            >
              <StyledBox
                isPlainHtml={isPlainHtml}
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
  )
}

Popover.defaultProps = {
  isPlainHtml: true,
  rimless: false,
  placement: placements.TOP
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
   * Content of the popover
   */
  placement: PropTypes.oneOf(Object.values(placements))
}

export default Popover
