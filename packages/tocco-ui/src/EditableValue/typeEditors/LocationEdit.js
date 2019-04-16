import React from 'react'
import PropTypes from 'prop-types'
import Autosuggest from 'react-autosuggest'
import uuid from 'uuid/v4'
import _isEmpty from 'lodash/isEmpty'

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
      if (locationInput[key]) {
        if (typeof locationInput[key] === 'string') {
          locationAcc.push(locationInput[key])
        }
        if (typeof locationInput[key] === 'object') {
          locationAcc.push(locationInput[key].display)
        }
      }
    }
    return `${mapsBaseAddress}${locationAcc.join('+')}`
  }
  
  return mapsBaseAddress
}

class LocationEdit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      zipFieldFocused: false,
      cityFieldFocused: false,
      currentZipValue: '',
      currentCityValue: ''
    }
  }

  returnGetSuggestion = attr => suggestion => suggestion[attr]

  renderSuggestion = suggestion => {
    const cantonString = suggestion.canton ? `- ${suggestion.canton}` : ''
    const countryString = suggestion.country ? `/ ${suggestion.country.display}` : ''

    return (
      <div>
        {suggestion.zip} {suggestion.city} {cantonString} {countryString}
      </div>
    )
  }

  onChangeZip = (event, {newValue}) => {
    this.setState({
      zipFieldFocused: true,
      cityFieldFocused: false,
      currentZipValue: event.target.value
    })

    this.props.options.fetchSuggestions(newValue)
    this.props.onChange({zip: newValue})
  }

  onChangeCity = (event, {newValue}) => {
    this.setState({
      zipFieldFocused: false,
      cityFieldFocused: true,
      currentCityValue: event.target.value
    })
    
    this.props.options.fetchSuggestions(newValue)
    this.props.onChange({city: newValue})
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      zipFieldFocused: false,
      cityFieldFocused: false
    })
  }

  returnSuggestionsContainer = focusedField => ({containerProps, children}) => {
    const containerData = {
      ...containerProps,
      className: 'react-autosuggest__suggestions-container--open'
    }
    if (this.props.options.isLoading && this.state[focusedField]) {
      return (
        <div {... containerData}>
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
      country: {display: suggestion.country.display, key: uuid()}
    })
  }

  render() {
    const inputPropsZip = {
      value: this.props.value.zip || this.state.currentZipValue,
      onChange: this.onChangeZip,
      readOnly: this.props.readOnly
    }

    const inputPropsCity = {
      value: this.props.value.city || this.state.currentCityValue,
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
            onSuggestionsFetchRequested={() => {}}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={this.returnGetSuggestion('zip')}
            renderSuggestion={this.renderSuggestion}
            inputProps={inputPropsZip}
            renderSuggestionsContainer={this.returnSuggestionsContainer('zipFieldFocused')}
            onSuggestionSelected={this.onSuggestionSelected}
            focusInputOnSuggestionClick={false}
          />
        </StyledZipInput>
        <Autosuggest
          suggestions={this.props.options.suggestions || []}
          onSuggestionsFetchRequested={() => {}}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.returnGetSuggestion('city')}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputPropsCity}
          renderSuggestionsContainer={this.returnSuggestionsContainer('cityFieldFocused')}
          onSuggestionSelected={this.onSuggestionSelected}
          focusInputOnSuggestionClick={false}
        />
        {!_isEmpty(this.props.value)
          && <ButtonLink
            href={getMapsAddress(this.props.value)}
            icon="external-link-alt"
            iconPosition="sole"
            look="ball"
            tabIndex={-1}
            target="_blank"
            dense={false}
          />
        }
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
