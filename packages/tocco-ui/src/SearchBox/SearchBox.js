import PropTypes from 'prop-types'
import React from 'react'
import _debounce from 'lodash/debounce'

import Button from '../Button'
import {StyledSearchBoxForm, StyledSearchBoxInput} from './StyledSearchBox'
import {StyledEditableWrapper, StyledEditableControl} from '../EditableValue/StyledEditableValue'
import StatedValue from '../StatedValue'

class SearchBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: props.value || ''
    }

    this.liveSearch = _debounce(this.onSearch, props.debounce)
  }

  onChange = evt => {
    const inputValue = evt.target.value
    this.setState({inputValue})

    if (this.props.liveSearch) {
      if ((inputValue.length === 0 || inputValue.length >= this.props.minInputLength)) {
        this.liveSearch()
      }
    }
  }

  lastSearched = ''
  onSearch = () => {
    const inputValue = this.state.inputValue
    if (inputValue !== this.lastSearched) {
      this.props.onSearch(inputValue)
      this.lastSearched = inputValue
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    this.onSearch()
  }

  render() {
    return (
      <StyledSearchBoxForm onSubmit={this.handleSubmit}>
        <StatedValue
          hasValue={!!this.state.inputValue}
          label={this.props.placeholder}
        >
          <StyledEditableWrapper>
            <StyledSearchBoxInput
              onChange={this.onChange}
              value={this.state.inputValue}
            />
            <StyledEditableControl>
              <Button
                icon="search"
                iconPosition="sole"
                look="ball"
                tabIndex={-1}
                type="submit"
              />
            </StyledEditableControl>
          </StyledEditableWrapper>
        </StatedValue>
      </StyledSearchBoxForm>
    )
  }
}

SearchBox.defaultProps = {
  debounce: 200,
  minInputLength: 3
}

SearchBox.propTypes = {
  /**
   * Optional default value
   */
  value: PropTypes.string,
  /**
   * Function that will be triggered. The input value will be passed as argument.
   */
  onSearch: PropTypes.func.isRequired,
  /**
   * Placeholder of the input field.
   */
  placeholder: PropTypes.string,
  /**
   * If true, the `onSearch` function will be triggered on the fly.
   */
  liveSearch: PropTypes.bool,
  /**
   * Amount of milli seconds before the next search will be invoked. The default is set to `200`.
   * Can be used to reduce the amount of search requests in the live search.
   * This property is only considered if the `liveSearch` property is set to true.
   */
  debounce: PropTypes.number,
  /**
   * Amount of minimum characters before the search starts. The default is set to `3`.
   * This property is only considered if the `liveSearch` property is set to true.
   */
  minInputLength: PropTypes.number
}

export default SearchBox
