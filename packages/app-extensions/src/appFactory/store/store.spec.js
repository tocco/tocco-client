import {getInitialState} from './store'

describe('app-extensions', () => {
  describe('appFactory', () => {
    describe('store', () => {
      describe('getInitialState', () => {
        test('should create empty initial state if no input', () => {
          expect(getInitialState()).to.deep.equal({})
        })

        test('should put input to initial state', () => {
          const input = {
            entityName: 'User'
          }
          expect(getInitialState(input)).to.deep.equal({
            input,
            intl: {
              locale: undefined
            }
          })
        })

        test('should put locale input to initial intl state', () => {
          const input = {
            entityName: 'User',
            locale: 'fr'
          }
          expect(getInitialState(input)).to.deep.equal({
            input,
            intl: {
              locale: 'fr'
            }
          })
        })
      })
    })
  })
})
