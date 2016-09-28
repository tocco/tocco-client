import React from 'react'
import classNames from 'classnames'

import './styles.scss'

/**
 * A loadmask that can hide elements as long as promises are not resolved
 */
class LoadMask extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      initialized: false
    }
  }

  componentDidMount() {
    if (this.props.promises) {
      Promise.all(this.props.promises).then(() => {
        this.setState({initialized: true})
      })
    }
  }

  render() {
    return (
      <div
        className={classNames('load-mask', this.props.className)}
      >
        {this.state.initialized
          ? this.props.children
          : <span className={'spinner glyphicon glyphicon-refresh glyphicon-spin'}/>}
      </div>
    )
  }
}

LoadMask.propTypes = {
  /**
   * Extend the the mask with any css classes separated by a space
   */
  className: React.PropTypes.string,
  /**
   * An array of promises.
   */
  promises: React.PropTypes.array,
  /**
   * Will be shown once promises are resolved
   */
  children: React.PropTypes.node
}

export default LoadMask
