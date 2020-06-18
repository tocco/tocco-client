import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import TitleMessage from '../../components/TitleMessage'
import {StyledModalContent, basePadding} from './StyledModalContent'

export const StyledCloseButton = styled.button`
  // copy: react-redux-toastr (index.scss)
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 22px;
  height: auto;  // reset
  opacity: .8;  // reset
  outline: none;
  position: sticky;
  top: ${basePadding}px;  // reset
  left: 100%;  // reset
  padding-right: 0;
  width: auto;  // reset
  z-index: 2;

  &:hover {
    opacity: 1;
  }

  &:focus {
    outline: none;
  }
`

export class ModalContent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {isClosing: false}
    this.handleCloseClick = this.handleCloseClick.bind(this)
  }

  handleCloseClick() {
    this.setState({isClosing: true})
    setTimeout(() => {
      this.props.close(this.props.id)
    }, 300) // Toastr fade out takes 300ms
  }

  render() {
    const {
      closable,
      message,
      title
    } = this.props

    const {isClosing} = this.state

    return (
      <div className="rrt-confirm-holder">
        <StyledModalContent isClosing={isClosing}>
          {closable && <StyledCloseButton onClick={this.handleCloseClick} type="button">
            ✕
          </StyledCloseButton>}
          <TitleMessage title={title} message={message} closable={closable}>
            <this.props.component close={this.handleCloseClick}/>
          </TitleMessage>
        </StyledModalContent>
        <div className={`shadow animated ${isClosing ? 'fadeOut' : 'fadeIn'}`} />
      </div>
    )
  }
}

ModalContent.propTypes = {
  id: PropTypes.any.isRequired,
  component: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  close: PropTypes.func.isRequired,
  title: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  message: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  closable: PropTypes.bool
}

export default ModalContent
