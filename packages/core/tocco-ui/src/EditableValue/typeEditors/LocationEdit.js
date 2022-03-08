import PropTypes from 'prop-types'
import React from 'react'
import Autosuggest from 'react-autosuggest'
import FocusWithin from 'react-simple-focus-within'

import Link from '../../Link'
import LoadingSpinner from '../../LoadingSpinner'
import Typography from '../../Typography'
import {StyledEditableControl} from '../StyledEditableValue'
import {StyledLocationEdit} from './StyledLocationEdit'

export const getGoogleMapsAddress = locationInput => {
  const mapsBaseAddress = 'https://www.google.com/maps/search/?api=1&query='

  const queryParams = locationInput
    ? Object.values(locationInput)
        .filter(Boolean)
        .map(value => (typeof value === 'object' && value.display ? value.display : value))
        .join('+')
    : ''

  return `${mapsBaseAddress}${queryParams}`
}

const LocationEdit = ({onChange: onChangeProp, options, value: valueProp, id, immutable, name}) => {
  const returnGetSuggestion = attr => suggestion => suggestion[attr]

  const renderSuggestion = suggestion => {
    const {state, country, postcode, city} = suggestion
    const cantonString = state ? `- ${state}` : ''
    const countryString = country ? `/ ${country.display}` : ''

    return (
      <Typography.Span>
        {postcode} {city} {cantonString} {countryString}
      </Typography.Span>
    )
  }

  const onChange =
    field =>
    (event, {newValue}) => {
      onChangeProp({...valueProp, [field]: newValue})
    }

  const onSuggestionSelected = (event, {suggestion}) => {
    onChangeProp(suggestion)
  }

  const returnOnSuggestionFetchRequested =
    field =>
    ({value}) => {
      options.fetchSuggestions({[field]: value}, options.locationValues.country)
    }

  const showGoogleMaps = value => Boolean(value.city || value.postcode)

  const inputPropsZip = {
    id: id,
    value: valueProp.postcode || '',
    onChange: onChange('postcode'),
    disabled: immutable
  }

  const inputPropsCity = {
    value: valueProp.city || '',
    onChange: onChange('city'),
    disabled: immutable
  }

  return (
    <FocusWithin>
      {({focused, getRef}) => (
        <StyledLocationEdit immutable={immutable} name={name} ref={getRef}>
          <Autosuggest
            suggestions={options.suggestions || []}
            onSuggestionsFetchRequested={returnOnSuggestionFetchRequested('postcode')}
            getSuggestionValue={returnGetSuggestion('postcode')}
            renderSuggestion={renderSuggestion}
            onSuggestionsClearRequested={() => {}}
            inputProps={inputPropsZip}
            onSuggestionSelected={onSuggestionSelected}
            focusInputOnSuggestionClick={false}
            shouldRenderSuggestions={v => v && !immutable}
          />
          {(focused || valueProp.city || valueProp.postcode) && <Typography.Span>/</Typography.Span>}
          <Autosuggest
            suggestions={options.suggestions || []}
            onSuggestionsFetchRequested={returnOnSuggestionFetchRequested('city')}
            getSuggestionValue={returnGetSuggestion('city')}
            renderSuggestion={renderSuggestion}
            onSuggestionsClearRequested={() => {}}
            inputProps={inputPropsCity}
            onSuggestionSelected={onSuggestionSelected}
            focusInputOnSuggestionClick={false}
            shouldRenderSuggestions={v => v && !immutable}
          />
          <StyledEditableControl>
            {options.isLoading && <LoadingSpinner size="1.8rem" />}
            {showGoogleMaps(options.locationValues) && (
              <Link
                href={getGoogleMapsAddress(options.locationValues)}
                icon="map-marked"
                tabIndex={-1}
                target="_blank"
                dense={false}
                title={options.mapButtonTitle || 'Show on map'}
                neutral
              />
            )}
          </StyledEditableControl>
        </StyledLocationEdit>
      )}
    </FocusWithin>
  )
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
  value: PropTypes.shape({
    city: PropTypes.string,
    postcode: PropTypes.string
  }),
  options: PropTypes.shape({
    suggestions: PropTypes.arrayOf(locationObjectPropType),
    fetchSuggestions: PropTypes.func,
    isLoading: PropTypes.bool,
    mapButtonTitle: PropTypes.string,
    locationValues: locationObjectPropType
  }),
  name: PropTypes.string,
  id: PropTypes.string,
  immutable: PropTypes.bool
}

export default LocationEdit
