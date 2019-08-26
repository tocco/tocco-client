import {expectSaga, testSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {fork, takeLatest} from 'redux-saga/effects'

import * as locationActions from './actions'
import * as sagas from './sagas'
import {getCountry, loadCountries, requestSuggestions, transformToSuggestions} from './utils'

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
              fork(takeLatest, locationActions.LOAD_LOCATION_SUGGESTIONS, sagas.loadLocations)
            ])
          })
        })

        describe('loadLocations saga', () => {
          test('should load location and dispatch', () => {
            const field = 'location_c'
            const payload = {field: 'location_c', searchInput: '3456', countryValue: 'CH', fieldCountries: 'DE'}
            return expectSaga(sagas.loadLocations, {payload})
              .provide([
                [matchers.call.fn(getCountry), ['CH']],
                [matchers.call.fn(requestSuggestions), {}],
                [matchers.call.fn(loadCountries), {}],
                [matchers.call.fn(transformToSuggestions), suggestions]
              ])
              .put(locationActions.setLocationSuggestionsLoading(field))
              .put(locationActions.setLocationSuggestions(field, suggestions))
              .run()
          })
        })
      })
    })
  })
})
