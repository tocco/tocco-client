// import {delay} from 'redux-saga'
import uuid from 'uuid/v4'

import * as actions from './actions'

import {all, call, fork, put, takeEvery} from 'redux-saga/effects'

export default function* sagas() {
  yield all([
    fork(takeEvery, actions.LOAD_LOCATION_SUGGESTIONS, loadLocations)
  ])
}

export function* loadLocations({payload: {field, searchInput}}) {
  yield put(actions.setLocationSuggestionsLoading(field))
  // uncomment to see isLoading animation
  // MOCK
  // yield delay(1000)
  const suggestions = [
    {
      city: `Zurich`,
      zip: '2306',
      canton: 'ZH',
      address: 'Bahnhofstrasse 1',
      district: 'Zurich',
      country: {display: 'Schweiz', key: uuid()}
    },
    {
      city: 'Lausanne',
      zip: '3000',
      canton: 'VD',
      address: 'Rue Saint Roche 1',
      district: 'VD',
      country: {display: 'Schweiz', key: uuid()}
    },
    {
      city: 'Bern',
      zip: '3450',
      canton: 'BE',
      address: 'Bundesplatz',
      district: 'Bern',
      country: {display: 'Schweiz', key: uuid()}
    }
  ]
  // END MOCK

  const hash = yield call(uuid)
  yield put(actions.setLocationSuggestions(field, suggestions, hash))
}
