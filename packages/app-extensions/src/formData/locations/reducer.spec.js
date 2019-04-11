import * as actions from './actions'
import {setLocationSuggestions} from './reducer'

describe('app-extensions', () => {
  describe('formData', () => {
    describe('tooltips', () => {
      describe('reducer', () => {
        describe('setLocationSuggestions', () => {
          test('should add new location suggestions', () => {
            const initialState = {}

            const locationSuggestions = [{
              city: 'Zurich',
              zipcode: '8006'
            }]

            const newState = setLocationSuggestions(
              initialState,
              actions.setLocationSuggestions('location_c', locationSuggestions)
            )

            const expectedStateAfter = {
              location_c: {
                suggestions: locationSuggestions
              }
            }

            expect(newState).to.eql(expectedStateAfter)
          })

          test('should overwrite tooltip with new value and keep the others', () => {
            const initialState = {
              location_c: {
                suggestions: [{
                  city: 'Zurich'
                }]
              },
              location_i: {
                suggestions: [{
                  city: 'Winterthur'
                }]
              }
            }

            const locationSuggestions = [{
              city: 'Weinfelden',
              zipcode: '8570'
            }]

            const newState = setLocationSuggestions(
              initialState,
              actions.setLocationSuggestions('location_c', locationSuggestions)
            )

            const expectedStateAfter = {
              location_c: {
                suggestions: [{
                  city: 'Weinfelden',
                  zipcode: '8570'
                }]
              },
              location_i: {
                suggestions: [{
                  city: 'Winterthur'
                }]
              }
            }

            expect(newState).to.eql(expectedStateAfter)
          })
        })
      })
    })
  })
})
