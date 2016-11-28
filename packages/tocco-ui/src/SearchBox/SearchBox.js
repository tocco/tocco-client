import React from 'react'
import Button from '../Button'
import './styles.scss'
import _debounce from 'lodash/debounce'

/**
 * SearchBox
 */
class SearchBox extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      inputValue: ''
    }
    this.search = _debounce(this.search, props.debounce)
  }

  updateValue = evt => {
    this.setState({'inputValue': evt.target.value})
  }

  search = () => {
    const value = this.state.inputValue
    if (this.props.liveSearch || (value && value.length >= this.props.minInputLength)) {
      this.props.onSearch(value)
    }
  }

  keyDownHandler = evt => {
    const KEY_ENTER_CODE = 13
    if (this.props.liveSearch || evt.keyCode === KEY_ENTER_CODE) {
      this.search()
    }
  }

  render() {
    return (
      <div
        className="tocco-searchbox row">
        <div
          className="col-lg-6">
          <div
            className="input-group">
            <input
              type="text"
              className="form-control"
              onKeyDown={this.keyDownHandler}
              placeholder={this.props.placeholder}
              value={this.state.inputValue}
              onChange={this.updateValue}
             />
            <span
              className="input-group-btn">
              <Button
                type="button"
                className="btn"
                onClick={this.search}
                icon="glyphicon-search"
                disabled={this.props.liveSearch
                  || !this.state.inputValue || this.state.inputValue.length < this.props.minInputLength}
              />
            </span>
          </div>
        </div>
      </div>
    )
  }
}

SearchBox.defaultProps = {
  debounce: 200,
  minInputLength: 3
}

SearchBox.propTypes = {
  /**
   * Function that will be triggered. The input value will be passed as argument.
   */
  onSearch: React.PropTypes.func.isRequired,
  /**
   * Placeholder of the input field.
   */
  placeholder: React.PropTypes.string,
  /**
   * If true, the `onSearch` function will be triggered on the fly.
   */
  liveSearch: React.PropTypes.bool,
  /**
   * Amount of milli seconds before the search starts. The default is set to `200`.
   */
  debounce: React.PropTypes.number,
  /**
   * Amount of minimum characters before the search starts. The default is set to `3`.
   */
  minInputLength: React.PropTypes.number
}

export default SearchBox
