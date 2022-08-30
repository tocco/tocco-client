import _get from 'lodash/get'
import _uniq from 'lodash/uniq'
import {all, call} from 'redux-saga/effects'
import {api} from 'tocco-util'

import rest from '../../rest'

const LOCATION_ENDPOINT = 'location/suggestions'
const countryCodeField = 'iso2'

// replace cache
// Caches country response to reduce resolving of key or ISO code.
// e.g. {'CH': {key: '22', display: 'Switzerland'}
let countryCache = {}

export const setCountryCache = newCountryCache => {
  countryCache = newCountryCache
}

export const getCountryCache = () => countryCache

export function* getCountryCodeByKey(key) {
  for (const prop in countryCache) {
    if (countryCache[prop].key === key) {
      return prop
    }
  }

  const entity = yield call(rest.fetchEntity, 'Country', key, {paths: [countryCodeField]})
  const display = yield call(rest.fetchDisplay, 'Country', key)
  const countryCode = _get(entity, ['paths', countryCodeField, 'value'])
  countryCache = {
    ...countryCache,
    [countryCode]: {key: entity.key, display}
  }

  return countryCode
}

export function* loadCountries(suggestions) {
  const allCountries = yield all(suggestions.map(suggestion => suggestion.country))

  const allCountriesUniq = yield call(_uniq, allCountries)

  const notLoaded = yield all(
    allCountriesUniq.reduce(
      (accumulator, currentValue) => [...accumulator, ...(countryCache[currentValue] ? [] : [currentValue])],
      []
    )
  )

  if (notLoaded.length > 0) {
    const query = {
      conditions: {
        [countryCodeField]: notLoaded
      },
      paths: [countryCodeField]
    }

    const countriesResponse = yield call(rest.fetchEntities, 'Country', query, {method: 'GET'})
    const displays = yield call(rest.fetchDisplays, api.getDisplayRequest(countriesResponse))

    countryCache = {
      ...countryCache,
      ...countriesResponse.reduce(
        (acc, value) => ({
          ...acc,
          [_get(value, ['paths', countryCodeField, 'value'])]: {
            key: value.key,
            display: _get(displays, ['Country', value.key])
          }
        }),
        {}
      )
    }
  }

  return countryCache
}

export const transformToSuggestions = (suggestions, countries) =>
  suggestions.map(suggestion => ({
    ...suggestion,
    country: countries[suggestion.country]
  }))

export function* requestSuggestions(city, postcode, country) {
  const options = {
    queryParams: {
      ...(city ? {city} : {}),
      ...(postcode ? {postcode} : {}),
      ...(country ? {country} : {})
    },
    method: 'GET'
  }

  const response = yield call(rest.requestSaga, LOCATION_ENDPOINT, options)
  return response.body.data
}

export function* getCountry(country, fieldCountries) {
  return country ? yield call(getCountryCodeByKey, country.key) : fieldCountries
}
