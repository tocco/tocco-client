import PropTypes from 'prop-types'
import React from 'react'

const checkboxState = {
  CHECKED: 'checked',
  INDETERMINATE: 'indeterminate',
  UNCHECKED: 'unchecked'
}

/**
 * Use <MultiCheckbox> to display if none, some or all items of a portion are selected.
 */
class MultiCheckbox extends React.Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.ref = React.createRef()
    this.state = {status: this.props.status || false}
  }

  componentDidMount() {
    this.handleIndeterminate(this.state.status)
  }

  componentDidUpdate() {
    this.handleIndeterminate(this.state.status)
  }

  handleIndeterminate(status) {
    this.ref.current.indeterminate = status === checkboxState.INDETERMINATE
  }

  onChange() {
    if (this.state.status === checkboxState.CHECKED || this.state.status === checkboxState.INDETERMINATE) {
      this.setState({status: false})
      this.props.onChange(checkboxState.UNCHECKED)
    } else {
      this.setState({status: checkboxState.CHECKED})
      this.props.onChange(checkboxState.CHECKED)
    }
  }

  render() {
    return (
      <input
        checked={this.state.status}
        onChange={this.onChange}
        ref={this.ref}
        type="checkbox"
      />
    )
  }
}

MultiCheckbox.propTypes = {
  /**
   *  State with 'checked' if checkbox is checked. State with 'indeterminate' if checkbox
   *  is neither checked nor unchecked. Skip prop to state that checkbox is unchecked.
   */
  status: PropTypes.oneOf([checkboxState.CHECKED, checkboxState.INDETERMINATE]),
  /**
   * Callback is executed on change. Callback receives new checkbox state, which is 'checked' or 'unchecked'.
   */
  onChange: PropTypes.func.isRequired
}

export default MultiCheckbox
