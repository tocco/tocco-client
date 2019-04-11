import {expectSaga, testSaga} from 'redux-saga-test-plan'
import uuid from 'uuid/v4'

import * as locationActions from './actions'
import * as sagas from './sagas'

import {fork, takeEvery} from 'redux-saga/effects'

const suggestions = [
  {
    city: `Zurich`,
    zip: '2306',
    canton: 'ZH',
    address: 'Bahnhofstrasse 1',
    district: 'Zurich',
    country: 'CH'
  },
  {
    city: 'Lausanne',
    zip: '3000',
    canton: 'VD',
    address: 'Rue Saint Roche 1',
    district: 'VD',
    country: 'CH'
  },
  {
    city: 'Bern',
    zip: '3450',
    canton: 'BE',
    address: 'Bundesplatz',
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
            return expectSaga(sagas.loadLocations, {payload})
              .put(locationActions.setLocationSuggestionsLoading(field))
              .call(uuid)
              .put(locationActions.setLocationSuggestions(field, suggestions))
              .run()
          })
        })
      })
    })
  })
})
