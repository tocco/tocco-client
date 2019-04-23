import React from 'react'
import PropTypes from 'prop-types'
import Autosuggest from 'react-autosuggest'

import ButtonLink from '../../ButtonLink'
import {
  StyledLocationEdit,
  StyledZipInput
} from './StyledLocationEdit'
import IconTocco from '../../IconTocco'

export const getGoogleMapsAddress = locationInput => {
  const mapsBaseAddress = `https://www.google.com/maps/search/?api=1&query=`

  const queryParams = locationInput
    ? Object.values(locationInput)
      .filter(value => value)
      .map(value => (typeof value === 'object' && value.display) ? value.display : value)
      .join('+')
    : ''

  return `${mapsBaseAddress}${queryParams}`
}

class LocationEdit extends React.Component {
  returnGetSuggestion = attr => suggestion => suggestion[attr]

  renderSuggestion = suggestion => {
    const cantonString = suggestion.state ? `- ${suggestion.state}` : ''
    const countryString = suggestion.country ? `/ ${suggestion.country.display}` : ''

    return <span>{suggestion.postcode} {suggestion.city} {cantonString} {countryString}</span>
  }

  onChange = field => (event, {newValue}) => {
    this.props.onChange({[field]: newValue})
  }

  returnSuggestionsContainer = ({containerProps, children}) =>
    <div
      {...containerProps}
      {...(this.props.options.isLoading ? {className: 'react-autosuggest__suggestions-container--open'} : {})}
    >
      {this.props.options.isLoading ? <div className="dropdown-icon"><IconTocco/></div> : children}
    </div>

  onSuggestionSelected = (event, {suggestion}) => {
    this.props.onChange(suggestion)
  }

  returnOnSuggestionFetchRequested = field => ({value}) => {
    this.props.options.fetchSuggestions({[field]: value}, this.props.value.country)
  }

  onSuggestionsClearRequested = () => {}

  showGoogleMaps = value => value && Object.values(value).some(val => val)

  render() {
    const inputPropsZip = {
      value: this.props.value.postcode || '',
      onChange: this.onChange('postcode'),
      disabled: this.props.readOnly
    }

    const inputPropsCity = {
      value: this.props.value.city || '',
      onChange: this.onChange('city'),
      disabled: this.props.readOnly
    }

    return (
      <StyledLocationEdit
        name={this.props.name}
        id={this.props.id}
        readOnly={this.props.readOnly}
      >
        <StyledZipInput>
          <Autosuggest
            suggestions={this.props.options.suggestions || []}
            onSuggestionsFetchRequested={this.returnOnSuggestionFetchRequested('postcode')}
            getSuggestionValue={this.returnGetSuggestion('postcode')}
            renderSuggestion={this.renderSuggestion}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            inputProps={inputPropsZip}
            renderSuggestionsContainer={this.returnSuggestionsContainer}
            onSuggestionSelected={this.onSuggestionSelected}
            focusInputOnSuggestionClick={false}
          />
        </StyledZipInput>
        <Autosuggest
          suggestions={this.props.options.suggestions || []}
          onSuggestionsFetchRequested={this.returnOnSuggestionFetchRequested('city')}
          getSuggestionValue={this.returnGetSuggestion('city')}
          renderSuggestion={this.renderSuggestion}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          inputProps={inputPropsCity}
          renderSuggestionsContainer={this.returnSuggestionsContainer}
          onSuggestionSelected={this.onSuggestionSelected}
          focusInputOnSuggestionClick={false}
        />
        {this.showGoogleMaps(this.props.value)
            && <ButtonLink
              href={getGoogleMapsAddress(this.props.value)}
              icon="globe"
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
  postcode: PropTypes.string,
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
