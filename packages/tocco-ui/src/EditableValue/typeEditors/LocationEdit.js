import React from 'react'
import PropTypes from 'prop-types'
import CreatableSelect from 'react-select/lib/Creatable'

import {
  StyledLocationEdit,
  StyledLocationEditZipInput,
  StyledLocationEditCityInput,
  menuCityStyles,
  menuZipStyles
} from './StyledLocationEdit'
import ButtonLink from '../../ButtonLink'

const components = {
  DropdownIndicator: null,
  ClearIndicator: null
}

export const getMapsAddress = locationInput => {
  const mapsBaseAddress = `https://www.google.com/maps/search/?api=1&query=`
  if (locationInput) {
    let location = ''
    for (const key in locationInput) {
      location += `${locationInput[key]}+`
    }
    return `${mapsBaseAddress}${location}`
  }
  return mapsBaseAddress
}

export const formatOptionLabel = (attr, createLabel) => (input, info) => {
  const menuString = `${input.zip} ${input.city} - ${input.district} / ${input.country}`
  const createValueString = createLabel || 'Wert einfügen'
  if (info && input) {
    if (info.context === 'menu' && input.label === '') {
      return <span>{createValueString}</span>
    }
    if (info.context === 'value' && input.label) {
      return <span>{input.label}</span>
    }
    if (info.context === 'menu' && !input.label) {
      return <span>{menuString}</span>
    }
  }
  if (info) {
    if (info.context === 'value') {
      return <span>{input[attr]}</span>
    }
  }
  if (input) {
    if (input.label) {
      return <span>{input.label}</span>
    }
  }
  return null
}

const LocationEdit = props => {
  const handleInputZipChange = zip => {
    if (zip && props.options.fetchSuggestions) {
      props.options.fetchSuggestions(zip)
      props.onChange({zip})
    }
  }

  const handleInputCityChange = city => {
    if (city && props.options.fetchSuggestions) {
      props.options.fetchSuggestions(city)
      props.onChange({city})
    }
  }

  const handleZipChange = zip => {
    if (zip && props.onChange) {
      props.onChange({zip: zip.value || zip.zip})
    }
  }

  const handleCityChange = city => {
    if (city && props.onChange) {
      props.onChange({city: city.value || city.city})
    }
  }

  const selectOptions = {
    components,
    name: props.name,
    id: props.id,
    value: props.value,
    isDisabled: props.readOnly,
    isLoading: props.options.isLoading,
    options: props.options.suggestions,
    placeholder: null,
    isClearable: true,
    isMulti: false,
    openMenuOnClick: false,
    openMenuOnFocus: false,
    hideSelectedOptions: true,
    createOptionPosition: 'first',
    allowCreateWhileLoading: true,
    filterOption: false,
    noOptionsMessage: () => props.options.noSuggestionsText,
    isValidNewOption: () => true,
    formatCreateLabel: inputValue => inputValue,
    theme: theme => ({
      ...theme,
      colors: {
        ...theme.colors,
        primary25: '#e0dede'
      }
    })
  }

  return (
    <StyledLocationEdit>
      <StyledLocationEditZipInput>
        <CreatableSelect
          styles={menuZipStyles}
          onChange={handleZipChange}
          onInputChange={handleInputZipChange}
          formatOptionLabel={formatOptionLabel('zip', props.createLabel)}
          {...selectOptions}
        />
      </StyledLocationEditZipInput>
      <StyledLocationEditCityInput>
        <CreatableSelect
          styles={menuCityStyles}
          onChange={handleCityChange}
          onInputChange={handleInputCityChange}
          formatOptionLabel={formatOptionLabel('city', props.createLabel)}
          {...selectOptions}
        />
      </StyledLocationEditCityInput>
      <ButtonLink
        href={getMapsAddress(props.value)}
        icon="external-link-alt"
        iconPosition="sole"
        look="ball"
        tabIndex={-1}
        target="_blank"
        dense={false}
      />
    </StyledLocationEdit>
  )
}

const locationObjectPropType = PropTypes.shape({
  city: PropTypes.string,
  zip: PropTypes.string,
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
  createLabel: PropTypes.string
}

export default LocationEdit
