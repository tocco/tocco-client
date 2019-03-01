import {delay} from 'redux-saga'
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
  // MOCK
  yield delay(1000)
  const suggestions = [
    {
      city: `Zurich ${searchInput}`,
      plz: '8006',
      canton: 'ZH',
      district: 'Zurich',
      country: 'CH'
    },
    {
      city: 'Bern',
      plz: '3000',
      district: 'Bern',
      country: 'CH'
    },
    {
      city: 'Lausanne',
      plz: '1000',
      district: 'Lausanne',
      country: 'CH'
    }
  ]
  // END MOCK

  const hash = yield call(uuid)
  yield put(actions.setLocationSuggestions(field, suggestions, hash))
}
