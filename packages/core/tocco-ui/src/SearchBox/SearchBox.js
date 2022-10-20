import PropTypes from 'prop-types'
import React, {useState} from 'react'
import {react} from 'tocco-util'

import Ball from '../Ball'
import {StyledEditableWrapper} from '../EditableValue/StyledEditableValue'
import StatedValue from '../StatedValue'
import {StyledSearchBox, StyledSearchBoxInput} from './StyledSearchBox'

const SearchBox = React.forwardRef(({value, minInputLength, onSearch, placeholder}, ref) => {
  const [inputValue, setInputValue] = useState(value || '')

  const onChange = e => {
    const newValue = e.target.value
    setInputValue(newValue)

    if (newValue.length === 0 || newValue.length >= minInputLength) {
      onSearch(newValue)
    }
  }

  const resetSearch = () => {
    setInputValue('')
    onSearch('')
  }

  return (
    <StyledSearchBox>
      <StatedValue hasValue={Boolean(inputValue)}>
        <StyledEditableWrapper>
          <StyledSearchBoxInput
            data-cy="ui-search-box"
            ref={ref}
            onChange={onChange}
            value={inputValue}
            aria-label={placeholder}
            placeholder={placeholder}
          />
          {inputValue?.length > 0 && <Ball data-cy="reset-button" icon="times" onClick={resetSearch} />}
        </StyledEditableWrapper>
      </StatedValue>
    </StyledSearchBox>
  )
})

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
   * onSearch is only called when the input has at least the length of minInputLength or 0
   */
  minInputLength: PropTypes.number
}

export default react.Debouncer(SearchBox, 100, 'onSearch')
