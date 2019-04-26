import _pick from 'lodash/pick'
import _uniq from 'lodash/uniq'
import _get from 'lodash/get'

import rest from '../../rest'

import {all, call} from 'redux-saga/effects'

const LOCATION_ENDPOINT = 'location/suggestions'
const countryCodeField = 'iso2'

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

  const entity = yield call(rest.fetchEntity, 'Country', key, {fields: [countryCodeField]})
  const countryCode = _get(entity, ['fields', countryCodeField, 'value'])
  countryCache = {
    ...countryCache,
    [countryCode]: {key: entity.key, display: entity.display}

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
    ))

  if (notLoaded.length > 0) {
    const query = {
      conditions: {
        [countryCodeField]: notLoaded
      },
      fields: [countryCodeField]
    }

    const countriesResponse = yield call(rest.fetchEntities, 'Country', query, {method: 'GET'})

    countryCache = {
      ...countryCache,
      ...(countriesResponse.reduce(
        (acc, value) =>
          ({...acc, [_get(value, ['fields', countryCodeField, 'value'])]: _pick(value, ['key', 'display'])}),
        {}
      ))
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
  return country
    ? yield call(getCountryCodeByKey, country.key)
    : fieldCountries
}
