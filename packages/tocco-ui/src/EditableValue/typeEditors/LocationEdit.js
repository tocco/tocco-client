import React from 'react'
import PropTypes from 'prop-types'
import CreatableSelect from 'react-select/lib/Creatable'

import StyledLocationEdit, {menuCityStyles, menuZipStyles} from './StyledLocationEdit'

const components = {
  DropdownIndicator: null,
  ClearIndicator: null
}

const LocationEdit = props => {
  const handleInputChange = input => {
    if (input && props.options.fetchSuggestions) {
      props.options.fetchSuggestions(input)
      props.onChange(input)
    }
  }

  const handleChange = input => {
    if (input && props.onChange) {
      props.onChange(input)
    }
  }

  const formatOptionLabel = attr => (input, info) => {
    const menuString = `${input.plz} ${input.city} - ${input.district} / ${input.country}`
    const deleteValueString = props.deleteLabel || 'Wert löschen'

    if (info.selectValue.length > 0) {
      if (info.context === 'menu' && input.label === '') {
        return <span>{deleteValueString}</span>
      }
    }
    if (info.context === 'value' && input.label) {
      return <span>{input.label}</span>
    }
    if (info.context === 'value') {
      return <span>{input[attr]}</span>
    }
    if (info.context === 'menu' && !input.label) {
      return <span>{menuString}</span>
    }
    if (input.label) {
      return <span>{input.label}</span>
    }
    return null
  }

  const selectOptions = {
    components,
    name: props.name,
    id: props.id,
    isDisabled: props.readOnly,
    isLoading: props.options.isLoading,
    options: props.options.suggestions,
    placeholder: null,
    isClearable: true,
    isMulti: false,
    openMenuOnClick: false,
    hideSelectedOptions: true,
    createOptionPosition: 'first',
    allowCreateWhileLoading: true,
    filterOption: null,
    value: props.value,
    noOptionsMessage: () => props.options.noSuggestionsText,
    isValidNewOption: () => true,
    formatCreateLabel: inputValue => inputValue,
    onChange: handleChange,
    onInputChange: handleInputChange
  }

  return (
    <StyledLocationEdit>
      <span className="zipInput">
        <CreatableSelect
          styles={menuZipStyles}
          formatOptionLabel={formatOptionLabel('plz')}
          {...selectOptions}
        />
      </span>
      <span className="cityInput">
        <CreatableSelect
          styles={menuCityStyles}
          formatOptionLabel={formatOptionLabel('city')}
          {...selectOptions}
        />
      </span>
    </StyledLocationEdit>
  )
}

const locationObjectPropType = PropTypes.shape({
  city: PropTypes.string,
  zipcode: PropTypes.string,
  address: PropTypes.string,
  country: PropTypes.string,
  canton: PropTypes.string,
  district: PropTypes.string
})

LocationEdit.propTypes = {
  onChange: PropTypes.func,
  value: locationObjectPropType,
  options: PropTypes.shape({
    suggestions: PropTypes.arrayOf(locationObjectPropType),
    fetchSuggestions: PropTypes.func,
    noSuggestionsText: PropTypes.string,
    isLoading: PropTypes.bool
  }),
  name: PropTypes.string,
  id: PropTypes.string,
  readOnly: PropTypes.bool,
  deleteLabel: PropTypes.string
}

export default LocationEdit
