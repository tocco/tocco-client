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
      zip: '8006',
      canton: 'ZH',
      district: 'Zurich',
      country: 'CH'
    },
    {
      city: 'Bern',
      zip: '3000',
      canton: 'BE',
      district: 'Bern',
      country: 'CH'
    }
  ]
  // END MOCK

  const hash = yield call(uuid)
  yield put(actions.setLocationSuggestions(field, suggestions, hash))
}
