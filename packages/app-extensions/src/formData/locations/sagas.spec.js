import {expectSaga, testSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import uuid from 'uuid/v4'

import * as locationActions from './actions'
import * as sagas from './sagas'

import {fork, takeEvery} from 'redux-saga/effects'

const suggestions = [
  {
    city: `Zurich`,
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
  }
]

describe('app-extensions', () => {
  describe('formData', () => {
    describe('locations', () => {
      describe('sagas', () => {
        describe('main saga', () => {
          test('should fork sagas', () => {
            const saga = testSaga(sagas.default)
            saga.next().all([
              fork(takeEvery, locationActions.LOAD_LOCATION_SUGGESTIONS, sagas.loadLocations)
            ])
          })
        })

        describe('loadLocations saga', () => {
          test('should load location', () => {
            const field = 'location_c'
            const payload = {field: 'location_c', searchInput: '3456'}
            const hash = '4a489db8-7a54-4107-ac2a-49180eddc2b6'
            return expectSaga(sagas.loadLocations, {payload})
              .provide([
                [matchers.call.fn(uuid), hash]
              ])
              .put(locationActions.setLocationSuggestionsLoading(field))
              .call(uuid)
              .put(locationActions.setLocationSuggestions(field, suggestions, hash))
              .run()
          })
        })
      })
    })
  })
})
