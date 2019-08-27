import React from 'react'
import PropTypes from 'prop-types'

import TitleMessage from '../../components/TitleMessage'
import {StyledModalContent} from './StyledModalContent'

class ModalContent extends React.Component {
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
          <TitleMessage title={title} message={message}>
            {closable && <button onClick={this.handleCloseClick} type="button" className="close-toastr">✕</button>}
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
