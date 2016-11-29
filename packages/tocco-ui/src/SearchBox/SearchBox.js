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

    this.liveSearch = _debounce(this.liveSearch, props.debounce)
  }

  updateValue = evt => {
    this.setState({inputValue: evt.target.value})
  }

  liveSearch = () => {
    const value = this.state.inputValue
    if (value && value.length >= this.props.minInputLength) {
      this.props.onSearch(value)
    }
  }

  explicitSearch = () => {
    const value = this.state.inputValue
    this.props.onSearch(value)
  }

  keyDownHandler = evt => {
    if (this.props.liveSearch) {
      this.liveSearch()
    } else if (evt.key === 'Enter') {
      this.explicitSearch()
    }
  }

  render() {
    return (
      <div
        className="tocco-searchbox">
        <div>
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
                onClick={this.explicitSearch}
                icon="glyphicon-search"
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
   * Amount of milli seconds before the next search will be invoked. The default is set to `200`.
   * Can be used to reduce the amount of search requests in the live search.
   * This property is only considered if the `liveSearch` property is set to true.
   */
  debounce: React.PropTypes.number,
  /**
   * Amount of minimum characters before the search starts. The default is set to `3`.
   * This property is only considered if the `liveSearch` property is set to true.
   */
  minInputLength: React.PropTypes.number
}

export default SearchBox
