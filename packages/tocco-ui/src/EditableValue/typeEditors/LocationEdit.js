import React from 'react'
import PropTypes from 'prop-types'
import Autosuggest from 'react-autosuggest'

import ButtonLink from '../../ButtonLink'
import IconTocco from '../../IconTocco'
import Typography from '../../Typography'
import {StyledEditableControl} from '../StyledEditableValue'
import {StyledLocationEdit} from './StyledLocationEdit'

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

    return <Typography.Span>{suggestion.postcode} {suggestion.city} {cantonString} {countryString}</Typography.Span>
  }

  onChange = field => (event, {newValue}) => {
    this.props.onChange({[field]: newValue})
  }

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
        <Autosuggest
          suggestions={this.props.options.suggestions || []}
          onSuggestionsFetchRequested={this.returnOnSuggestionFetchRequested('postcode')}
          getSuggestionValue={this.returnGetSuggestion('postcode')}
          renderSuggestion={this.renderSuggestion}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          inputProps={inputPropsZip}
          onSuggestionSelected={this.onSuggestionSelected}
          focusInputOnSuggestionClick={false}
          shouldRenderSuggestions={v => v && !this.props.readOnly}
        />
        <Typography.Span>/</Typography.Span>
        <Autosuggest
          suggestions={this.props.options.suggestions || []}
          onSuggestionsFetchRequested={this.returnOnSuggestionFetchRequested('city')}
          getSuggestionValue={this.returnGetSuggestion('city')}
          renderSuggestion={this.renderSuggestion}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          inputProps={inputPropsCity}
          onSuggestionSelected={this.onSuggestionSelected}
          focusInputOnSuggestionClick={false}
          shouldRenderSuggestions={v => v && !this.props.readOnly}
        />
        <StyledEditableControl>
          {this.props.options.isLoading && <IconTocco size="1.8rem"/>}
          {this.showGoogleMaps(this.props.value)
            && <ButtonLink
              href={getGoogleMapsAddress(this.props.value)}
              icon="map-marked-alt"
              iconPosition="sole"
              look="ball"
              tabIndex={-1}
              target="_blank"
              dense={false}
              title={this.props.options.mapButtonTitle || 'Show on Maps'}
            />
          }
        </StyledEditableControl>

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
    isLoading: PropTypes.bool,
    mapButtonTitle: PropTypes.string
  }),
  name: PropTypes.string,
  id: PropTypes.string,
  readOnly: PropTypes.bool
}

export default LocationEdit
