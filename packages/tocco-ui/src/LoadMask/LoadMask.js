import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'

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

  componentWillReceiveProps(nextProps) {
    if (!this.state.initialized) {
      if (nextProps.required && this.requiredLoaded(nextProps.required)) {
        this.setInitialized()
      }
    }
  }

  render() {
    return (
      <div
        id="load-mask"
        className={classNames('load-mask', this.props.className)}
      >
        {this.state.initialized
          ? this.props.children
          : <div className="loader">
            <div className="loader-icon center-block"/>
            {this.props.loadingText && <div className="loader-text text-center ">{this.props.loadingText}</div>}
          </div>}
      </div>
    )
  }
}

LoadMask.propTypes = {
  /**
   * Extend the the mask with any css classes separated by a space
   */
  className: PropTypes.string,
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
