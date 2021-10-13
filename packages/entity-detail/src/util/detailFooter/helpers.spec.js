import {getFooterType, getFooterPaths} from './helpers'
import types from './types'

describe('entity-detail', () => {
  describe('util', () => {
    describe('detailFooter', () => {
      describe('helpers', () => {
        describe('getFooterPaths', () => {
          test('should return all paths for `update` mode and `useNiceFields=true`', () => {
            const mode = 'update'
            const entityModel = {
              useNiceFields: true,
              keyField: 'pk'
            }
            const result = getFooterPaths(mode, entityModel)
            expect(result).to.have.length(6)
          })

          test('should only return `keyField` path for `update` mode and `useNiceFields=false`', () => {
            const mode = 'update'
            const entityModel = {
              useNiceFields: false,
              keyField: 'id'
            }
            const result = getFooterPaths(mode, entityModel)
            expect(result).to.deep.equal(['id'])
          })

          test('should not return any path for `create` mode', () => {
            const mode = 'create'
            const entityModel = {
              useNiceFields: true,
              keyField: 'pk'
            }
            const result = getFooterPaths(mode, entityModel)
            expect(result).to.have.length(0)
          })
        })

        describe('getFooterType', () => {
          test('should return `FULL` footer type for `update` mode and `useNiceFields=true`', () => {
            const mode = 'update'
            const entityModel = {
              useNiceFields: true,
              keyField: 'pk'
            }
            const result = getFooterType(mode, entityModel)
            expect(result).to.equal(types.FULL)
          })

          test('should return `REDUCED` footer type for `update` mode and `useNiceFields=false`', () => {
            const mode = 'update'
            const entityModel = {
              useNiceFields: false,
              keyField: 'pk'
            }
            const result = getFooterType(mode, entityModel)
            expect(result).to.equal(types.REDUCED)
          })

          test('should return `NONE` footer type for `create` mode', () => {
            const mode = 'create'
            const entityModel = {
              useNiceFields: true,
              keyField: 'pk'
            }
            const result = getFooterType(mode, entityModel)
            expect(result).to.equal(types.NONE)
          })
        })
      })
    })
  })
})
