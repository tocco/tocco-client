import React from 'react'
import PropTypes from 'prop-types'
import Autosuggest from 'react-autosuggest'

import ButtonLink from '../../ButtonLink'
import {
  StyledLocationEdit,
  StyledZipInput
} from './StyledLocationEdit'
import IconTocco from '../../IconTocco'

export const getMapsAddress = locationInput => {
  const mapsBaseAddress = `https://www.google.com/maps/search/?api=1&query=`
  if (locationInput) {
    const locationAcc = []
    for (const key in locationInput) {
      if (typeof locationInput[key] === 'string') {
        locationAcc.push(locationInput[key])
      }
      if (typeof locationInput[key] === 'object') {
        locationAcc.push(locationInput[key].display)
      }
    }
    return `${mapsBaseAddress}${locationAcc.join('+')}`
  }
  
  return mapsBaseAddress
}

export const getSuggestions = (value, suggestions) => {
  if (suggestions) {
    const inputValue = value.trim().toLowerCase()
    const inputLength = inputValue.length

    return inputLength === 0 ? [] : suggestions
  }
  return []
}

export const returnGetSuggestion = attr => suggestion => suggestion[attr]

const renderSuggestion = suggestion => (
  <div>
    {suggestion.zip} {suggestion.city} - {suggestion.canton} / {suggestion.country}
  </div>
)

class LocationEdit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      zipFieldFocused: false,
      cityFieldFocused: false
    }
  }

  onChangeZip = (event, {newValue}) => {
    this.setState({
      zipFieldFocused: true,
      cityFieldFocused: false
    })

    this.props.options.fetchSuggestions(newValue)
    this.props.onChange({zip: newValue})
  }

  onChangeCity = (event, {newValue}) => {
    this.setState({
      zipFieldFocused: false,
      cityFieldFocused: true
    })
    
    this.props.options.fetchSuggestions(newValue)
    this.props.onChange({city: newValue})
  }

  onSuggestionsFetchRequestedZip = ({value}) => {
    this.setState({
      suggestions: getSuggestions(value, this.props.options.suggestions || [])
    })
  }

  onSuggestionsFetchRequestedCity = ({value}) => {
    this.setState({
      suggestions: getSuggestions(value, this.props.options.suggestions || [])
    })
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    })
  }

  renderSuggestionsZipContainer = ({containerProps, children}) => {
    if (this.props.options.isLoading && this.state.zipFieldFocused) {
      return (
        <div {... containerProps}>
          <div className="dropdown-icon"><IconTocco/></div>
        </div>
      )
    }
    return (
      <div {... containerProps}>
        {children}
      </div>
    )
  }

  renderSuggestionsCityContainer = ({containerProps, children}) => {
    if (this.props.options.isLoading && this.state.cityFieldFocused) {
      return (
        <div {... containerProps}>
          <div className="dropdown-icon"><IconTocco/></div>
        </div>
      )
    }
    return (
      <div {... containerProps}>
        {children}
      </div>
    )
  }

  onSuggestionSelected = (event, {suggestion}) => {
    this.props.onChange({
      zip: suggestion.zip,
      city: suggestion.city,
      street: suggestion.address,
      canton: suggestion.canton,
      district: suggestion.district,
      country: {display: suggestion.country, key: suggestion.country}
    })
  }

  render() {
    const inputPropsZip = {
      value: this.props.value.zip || '',
      onChange: this.onChangeZip,
      readOnly: this.props.readOnly
    }

    const inputPropsCity = {
      value: this.props.value.city || '',
      onChange: this.onChangeCity,
      readOnly: this.props.readOnly
    }

    return (
      <StyledLocationEdit
        name={this.props.name}
        id={this.props.id}
      >
        <StyledZipInput>
          <Autosuggest
            suggestions={this.props.options.suggestions || []}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequestedZip}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={returnGetSuggestion('zip')}
            renderSuggestion={renderSuggestion}
            inputProps={inputPropsZip}
            renderSuggestionsContainer={this.renderSuggestionsZipContainer}
            onSuggestionSelected={this.onSuggestionSelected}
          />
        </StyledZipInput>
        <Autosuggest
          suggestions={this.props.options.suggestions || []}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequestedCity}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={returnGetSuggestion('city')}
          renderSuggestion={renderSuggestion}
          inputProps={inputPropsCity}
          renderSuggestionsContainer={this.renderSuggestionsCityContainer}
          onSuggestionSelected={this.onSuggestionSelected}
        />
        <ButtonLink
          href={getMapsAddress(this.props.value)}
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
}

const locationObjectPropType = PropTypes.shape({
  city: PropTypes.string,
  zip: PropTypes.string,
  address: PropTypes.string,
  country: PropTypes.shape({
    display: PropTypes.string,
    key: PropTypes.string
  }),
  canton: PropTypes.string,
  district: PropTypes.string
})

LocationEdit.propTypes = {
  onChange: PropTypes.func,
  value: locationObjectPropType,
  options: PropTypes.shape({
    suggestions: PropTypes.arrayOf(locationObjectPropType),
    fetchSuggestions: PropTypes.func,
    isLoading: PropTypes.bool
  }),
  name: PropTypes.string,
  id: PropTypes.string,
  readOnly: PropTypes.bool
}

export default LocationEdit
