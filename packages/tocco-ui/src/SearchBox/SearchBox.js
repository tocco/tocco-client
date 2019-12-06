import PropTypes from 'prop-types'
import React, {useState} from 'react'
import {react} from 'tocco-util'

import {StyledSearchBox, StyledSearchBoxInput} from './StyledSearchBox'
import {StyledEditableWrapper} from '../EditableValue/StyledEditableValue'
import StatedValue from '../StatedValue'

const SearchBox = React.forwardRef((props, ref) => {
  const {value, minInputLength, onSearch, placeholder} = props
  const [inputValue, setInputValue] = useState(value || '')

  const onChange = e => {
    const newValue = e.target.value
    setInputValue(newValue)

    if ((newValue.length === 0 || newValue.length >= minInputLength)) {
      onSearch(newValue)
    }
  }

  return (
    <StyledSearchBox className="StyledSearchBox">
      <StatedValue
        hasValue={!!inputValue}
        label={placeholder}
      >
        <StyledEditableWrapper>
          <StyledSearchBoxInput
            ref={ref}
            onChange={onChange}
            value={inputValue}
          />
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

export default react.Debouncer(SearchBox, 300, 'onSearch')
