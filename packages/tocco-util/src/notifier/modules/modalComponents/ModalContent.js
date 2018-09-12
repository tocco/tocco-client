import React from 'react'
import PropTypes from 'prop-types'

import {Content} from '../../components/TitleMessage'
import {StyledModelContent} from './StyledModelContent'

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

    return (
      <div className="rrt-confirm-holder">
        <StyledModelContent isClosing={this.state.isClosing}>
          {title && <Content content={title} isTitle={true} />}
          {message && <Content content={message} />}
          {closable && <button onClick={this.handleCloseClick} type="button" className="close-toastr">✕</button>}
          <this.props.component close={this.handleCloseClick}/>
        </StyledModelContent>
        <div className="shadow" onClick={() => { if (closable === true) { this.handleCloseClick() } }}/>
      </div>
    )
  }
}

ModalContent.propTypes = {
  id: PropTypes.any.isRequired,
  component: PropTypes.oneOfType([ PropTypes.node, PropTypes.func ]).isRequired,
  close: PropTypes.func.isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
  closable: PropTypes.bool
}

export default ModalContent
