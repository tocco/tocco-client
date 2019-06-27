import PropTypes from 'prop-types'
import React from 'react'

import IconTocco from '../IconTocco'
import Typography from '../Typography'
import StyledLoadMask from './StyledLoadMask'

/**
 * A loadmask that can hide elements as long as promises are not resolved
 */
class LoadMask extends React.Component {
  mounted = false
  constructor(props) {
    super(props)

    let initialized = false
    if (props.required && this.requiredLoaded(props.required)) {
      initialized = true
    }

    this.state = {
      initialized
    }
  }

  requiredLoaded = required => !required.some(r => (!r))

  setInitialized = () => {
    if (this.mounted && !this.state.initialized) {
      this.setState({initialized: true})
    }
  }

  componentDidMount() {
    this.mounted = true
    if (this.props.promises) {
      Promise.all(this.props.promises).then(() => {
        this.setInitialized()
      })
    }
  }

  componentWillUnmount() {
    this.mounted = false
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!this.state.initialized) {
      const test = this.requiredLoaded(this.props.required)
      if (this.props.required && test) {
        this.setInitialized()
      }
    }
  }

  render() {
    const loadingIconAndText = [
      <IconTocco key="IconTocco" size="30px" />
    ]

    if (this.props.loadingText) {
      loadingIconAndText.push(
        <Typography.Span key="loadingText">{this.props.loadingText}</Typography.Span>
      )
    }

    return (
      <StyledLoadMask isInitialized={this.state.initialized}>
        {this.state.initialized ? this.props.children : [...loadingIconAndText]}
      </StyledLoadMask>
    )
  }
}

LoadMask.propTypes = {
  /**
   * Optional text to be shown below spinner
   */
  loadingText: PropTypes.string,
  /**
   * As soon as all elements of the array are truthy, children will be displayed.
   */
  required: PropTypes.arrayOf(PropTypes.any),
  /**
   * An array of promises as alternative to required.
   */
  promises: PropTypes.array,
  /**
   * Will be shown once promises are resolved
   */
  children: PropTypes.node
}

export default LoadMask
