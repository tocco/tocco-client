import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import {Manager, Popper, Reference} from 'react-popper'
import StyledPopoverBox from './StyledPopoverBox'
import StyledArrow from './StyledArrow'

const placements = {
  AUTO: 'auto',
  TOP: 'top',
  RIGHT: 'right',
  BOTTOM: ' bottom',
  LEFT: 'left'
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
    return <Manager>
      <Reference>
        {({ref}) => (
          <span ref={ref} onMouseOver={this.handleMouseEnter} onMouseOut={this.handleMouseLeave}>
            {this.props.children}
          </span>
        )}
      </Reference>
      {this.state.showToolTip && this.props.content
      && ReactDOM.createPortal(
        <Popper placement={this.props.placement}>
          {({ref, style, placement, arrowProps}) => (
            <StyledPopoverBox
              innerRef={ref}
              style={style}
            >
              {this.props.content}
              <StyledArrow
                innerRef={arrowProps.ref}
                data-placement={placement}
                style={arrowProps.style}
              />
            </StyledPopoverBox>
          )}
        </Popper>
        , document.querySelector('body'))}
    </Manager>
  }
}

Popover.defaultProps = {
  placement: placements.TOP
}

Popover.propTypes = {
  /**
   * Content of the popover
   */
  content: PropTypes.node,
  /**
   * Content of the popover
   */
  children: PropTypes.node,
  /**
   * Content of the popover
   */
  placement: PropTypes.string
}

export default Popover
