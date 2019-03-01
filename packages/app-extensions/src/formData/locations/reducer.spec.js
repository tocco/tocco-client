import * as actions from './actions'
import {setLocationSuggestions} from './reducer'

describe('app-extensions', () => {
  describe('formData', () => {
    describe('tooltips', () => {
      describe('reducer', () => {
        describe('setLocationSuggestions', () => {
          const HASH = 1234
          test('should add new location suggestions', () => {
            const initialState = {}

            const locationSuggestions = [{
              city: 'Zurich',
              zipcode: '8006'
            }]

            const newState = setLocationSuggestions(
              initialState,
              actions.setLocationSuggestions('location_c', locationSuggestions, HASH)
            )

            const expectedStateAfter = {
              location_c: {
                suggestions: locationSuggestions,
                hash: HASH
              }
            }

            expect(newState).to.eql(expectedStateAfter)
          })

          test('should overwrite tooltip with new value and keep the others', () => {
            const initialState = {
              location_c: {
                suggestions: [{
                  city: 'Zurich'
                }],
                hash: 1
              },
              location_i: {
                suggestions: [{
                  city: 'Winterthur'
                }],
                hash: 2
              }
            }

            const locationSuggestions = [{
              city: 'Weinfelden',
              zipcode: '8570'
            }]

            const newState = setLocationSuggestions(
              initialState,
              actions.setLocationSuggestions('location_c', locationSuggestions, HASH)
            )

            const expectedStateAfter = {
              location_c: {
                suggestions: [{
                  city: 'Weinfelden',
                  zipcode: '8570'
                }],
                hash: HASH
              },
              location_i: {
                suggestions: [{
                  city: 'Winterthur'
                }],
                hash: 2
              }
            }

            expect(newState).to.eql(expectedStateAfter)
          })
        })
      })
    })
  })
})
