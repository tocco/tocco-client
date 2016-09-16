import React from 'react'
import classNames from 'classnames'

import './styles.scss'

export class LoadMask extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      initialized: false
    }
  }

  componentDidMount() {
    Promise.all(this.props.promises || [Promise.resolve()]).then(() => this.setState({initialized: true}))
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
  className: React.PropTypes.string,
  promises: React.PropTypes.array,
  children: React.PropTypes.node
}

export default LoadMask
