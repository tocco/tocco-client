import {lazyValueEnhancer} from './lazyLoading'

describe('entity-list', () => {
  describe('util', () => {
    describe('lazyLoading', () => {
      test('should enhance single default displays ', () => {
        const value = {key: 1, model: 'EntityX'}
        const type = 'single-remote-field'
        const lazyData = {
          defaultDisplays: {
            EntityX: {
              1: 'Entity1'
            }
          }
        }
        const info = {}

        const result = lazyValueEnhancer(value, type, lazyData, info)

        const expectedResult = {key: 1, model: 'EntityX', display: 'Entity1'}
        expect(result).to.deep.equal(expectedResult)
      })
    })

    test('should enhance multi default displays ', () => {
      const value = [{key: 1, model: 'EntityX'}, {key: 2, model: 'EntityX'}]
      const type = 'multi-select-box'
      const lazyData = {
        defaultDisplays: {
          EntityX: {
            1: 'Entity1'
          }
        }
      }
      const info = {}

      const result = lazyValueEnhancer(value, type, lazyData, info)

      const expectedResult = [{key: 1, model: 'EntityX', display: 'Entity1'}, {key: 2, model: 'EntityX', display: ''}]
      expect(result).to.deep.equal(expectedResult)
    })

    test('should enhance display expressions', () => {
      const value = null
      const type = 'displayExpression'
      const lazyData = {
        displayExpressions: {
          User_list: {
            1: {
              eE1: 'TEST1',
              eE2: 'TEST2'
            }
          }
        }
      }
      const info = {formName: 'User_list', key: 1, path: 'eE2'}

      const result = lazyValueEnhancer(value, type, lazyData, info)

      const expectedResult = 'TEST2'
      expect(result).to.deep.equal(expectedResult)
    })
  })
})
