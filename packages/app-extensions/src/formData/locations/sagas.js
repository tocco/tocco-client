import {all, call, fork, put, takeLatest} from 'redux-saga/effects'

import * as actions from './actions'
import {loadCountries, transformToSuggestions, requestSuggestions, getCountry} from './utils'

export default function* sagas() {
  yield all([
    fork(takeLatest, actions.LOAD_LOCATION_SUGGESTIONS, loadLocations)
  ])
}

export function* loadLocations({payload: {field, searchInput, countryValue, fieldCountries}}) {
  yield put(actions.setLocationSuggestionsLoading(field))

  const {city, postcode} = searchInput
  const country = yield call(getCountry, countryValue, fieldCountries)
  const suggestionsResponse = yield call(requestSuggestions, city, postcode, country)

  const countries = yield call(loadCountries, suggestionsResponse)
  const suggestions = yield call(transformToSuggestions, suggestionsResponse, countries)

  yield put(actions.setLocationSuggestions(field, suggestions))
}
