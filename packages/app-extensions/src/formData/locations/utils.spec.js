import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'

import * as utils from './utils'
import rest from '../../rest'

describe('app-extensions', () => {
  describe('formData', () => {
    describe('locations', () => {
      describe('getCountryCodeByKey', () => {
        test('should fetch an uncached country, add to cache and return country code', async() => {
          const countryKey = 1
          const countryEntity = {
            key: 1,
            display: 'Switzerland',
            fields: {iso2: {value: 'CH'}}
          }
          utils.setCountryCache({})

          await expectSaga(utils.getCountryCodeByKey, countryKey)
            .provide([
              [matchers.call.fn(rest.fetchEntity), countryEntity]
            ])
            .call.like({fn: rest.fetchEntity})
            .returns('CH')
            .run()
          expect(utils.getCountryCache()).to.have.property('CH')
        })

        test('should not fetch if counrty in cache', () => {
          const countryKey = 2
          utils.setCountryCache({'DE': {key: 2, display: 'Germany'}})
          return expectSaga(utils.getCountryCodeByKey, countryKey)
            .not.call.like({fn: rest.fetchEntity})
            .returns('DE')
            .run()
        })
      })

      describe('loadCountries', () => {
        test('should load counties by code, add to cache and return', async() => {
          const suggestions = [
            {country: 'CH', postcode: '8001'},
            {country: 'CH', postcode: '8002'},
            {country: 'DE', postcode: '10000'}
          ]
          utils.setCountryCache({})

          const countryEntities = [
            {
              key: 1,
              display: 'Switzerland',
              fields: {iso2: {value: 'CH'}}
            },
            {
              key: 2,
              display: 'Germany',
              fields: {iso2: {value: 'DE'}}
            }
          ]

          const {returnValue} = await expectSaga(utils.loadCountries, suggestions)
            .provide([
              [matchers.call.fn(rest.fetchEntities), countryEntities]
            ])
            .call.like({fn: rest.fetchEntities})
            .run()

          expect(utils.getCountryCache()).to.have.property('CH')
          expect(utils.getCountryCache()).to.have.property('DE')
          expect(returnValue).to.have.property('DE')
          expect(returnValue).to.have.property('DE')
        })
      })

      describe('transformToSuggestions', () => {
        test('should transform countries in suggestion to entities', () => {
          const suggestions = [{country: 'DE'}, {country: 'CH'}]
          const countries = {CH: {key: 1, display: 'Switzerland'}, DE: {key: 2, display: 'Germany'}}
          const result = utils.transformToSuggestions(suggestions, countries)
          const expectedResult = [{country: countries.DE}, {country: countries.CH}]
          expect(result).to.eql(expectedResult)
        })
      })

      describe('requestSuggestions', () => {
        test('should call requestSagas ', () => {
          return expectSaga(utils.requestSuggestions, 'Zurich', '8007', 'CH')
            .provide([
              [matchers.call.fn(rest.requestSaga), {body: {data: {}}}]
            ])
            .call.like({fn: rest.requestSaga})
            .run()
        })
      })

      describe('getCountry', () => {
        test('should return country code of country value if defined', () => {
          return expectSaga(utils.getCountry, {key: 1}, ['DE', 'CH'])
            .provide([
              [matchers.call(utils.getCountryCodeByKey, 1), 'CH']
            ])
            .returns('CH')
            .run()
        })

        test('should return field countries if country undefined', () => {
          return expectSaga(utils.getCountry, null, ['DE', 'CH'])
            .returns(['DE', 'CH'])
            .run()
        })
      })
    })
  })
})
