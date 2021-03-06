import {difference} from './object'

describe('tocco-util', () => {
  describe('object', () => {
    describe('difference', () => {
      test('should show difference of two objects', () => {
        const obj = {
          firstname: 'Homer',
          lastname: 'Simpson'
        }
        const base = {
          firstname: 'Bart',
          lastname: 'Simpson'
        }

        const diff = difference(obj, base)
        expect(diff).to.eql({firstname: 'Homer'})
      })

      test('should show difference of deep objects', () => {
        const obj = {
          address: {
            street: 'Riedtlistrasse',
            city: {
              zipcode: '8006',
              name: 'Zurich'
            }
          }
        }

        const base = {
          address: {
            street: 'Riedtlistrasse',
            city: {
              zipcode: '8007',
              name: 'Zurich'
            }
          }
        }

        const diff = difference(obj, base)
        expect(diff).to.eql({address: {city: {zipcode: '8006'}}})
      })

      test('should handle function values', () => {
        const func1 = () => {}
        const func2 = () => {}

        const obj = {
          func: func1
        }

        const base = {
          func: func2
        }

        const diff = difference(obj, base)
        expect(diff.func).to.eql(func1)
      })
    })
  })
})
