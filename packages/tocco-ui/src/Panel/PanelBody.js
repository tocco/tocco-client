import PropTypes from 'prop-types'
import React from 'react'

import StyledPanelBody from './StyledPanelBody'

/**
 * Only <Panel.Body/> is affected by the visibility state.
 */
class PanelBody extends React.PureComponent {
  state = {}

  setHeight = () => {
    this.outerEl.setAttribute('style', 'height: auto; animation: none;')
    this.setState({
      heightIfOpen: `${this.outerEl.offsetHeight}px`
    })
    this.outerEl.removeAttribute('style')
  }

  relevantAttributes = ['data-image-in-cache', 'style']
  observerCallback = mutationsList => {
    const isNotIgnorableAttributeChange = mutation =>
      mutation.type !== 'attributes' || this.relevantAttributes.includes(mutation.attributeName)

    if (mutationsList.some(isNotIgnorableAttributeChange)) {
      this.setHeight()
    }
  }

  connectObserver() {
    this.observer = new MutationObserver(this.observerCallback)
    this.observer.observe(this.innerEl, {
      attributes: true,
      childList: true,
      subtree: true,
      characterData: true
    })
  }

  disconnectObserver() {
    if (this.observer) {
      this.observer.disconnect()
    }
  }

  componentDidMount() {
    this.setHeight()
    window.addEventListener('resize', this.setHeight)
    this.connectObserver()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setHeight)
    this.disconnectObserver()
  }

  render() {
    const {
      children,
      isFramed,
      isOpen
    } = this.props

    return (
      <StyledPanelBody
        isFramed={isFramed}
        isOpen={isOpen}
        ref={outerEl => { this.outerEl = outerEl }}
        heightIfOpen={this.state.heightIfOpen}
      >
        <div ref={innerEl => { this.innerEl = innerEl }}>
          {React.Children.map(children, child => React.cloneElement(child))}
        </div>
      </StyledPanelBody>
    )
  }
}

PanelBody.propTypes = {
  children: PropTypes.node,
  /**
   * Boolean to control if <Panel.Header/>, <Panel.Body/> and <Panel.Footer/> is initially opened.
   * Value is always overridden by parent element.
   */
  isFramed: PropTypes.bool,
  /**
   * Boolean to control if <Panel.Body/> is initially opened. Value is always overridden by parent element.
   */
  isOpen: PropTypes.bool
}

export default PanelBody
