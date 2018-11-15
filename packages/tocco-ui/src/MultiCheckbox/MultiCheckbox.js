import PropTypes from 'prop-types'
import React from 'react'
import ReactDOM from 'react-dom'

/**
 * Use <MultiCheckbox> to display if none, some or all items of a portion are selected.
 */

class MultiCheckbox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {status: this.props.status || false}
    this.onChange = this.onChange.bind(this)
  }

  componentDidMount() {
    this.handleIndeterminate(this.state.status)
  }

  componentDidUpdate() {
    this.handleIndeterminate(this.state.status)
  }

  handleIndeterminate(status) {
    ReactDOM.findDOMNode(this).indeterminate = status === 'indeterminate' // eslint-disable-line react/no-find-dom-node
  }

  onChange() {
    if (this.state.status === 'checked' || this.state.status === 'indeterminate') {
      this.setState({status: false})
      this.props.cbUncheck()
    } else {
      this.setState({status: 'checked'})
      this.props.cbCheck()
    }
  }

  render() {
    return (
      <input
        type="checkbox"
        checked={ this.state.status }
        onChange={ this.onChange }
      />
    )
  }
}

MultiCheckbox.propTypes = {
  /**
   *  State with 'indeterminate' if some or with 'checked' if all items are selected.
   *  Skip prop to state that none items are selected.
   */
  status: PropTypes.oneOf(['checked', 'indeterminate']),
  /**
   * Callback is executed when checkbox was checked.
   */
  cbCheck: PropTypes.func.isRequired,
  /**
   * Callback is executed when checkbox was unchecked.
   */
  cbUncheck: PropTypes.func.isRequired

}

export default MultiCheckbox
