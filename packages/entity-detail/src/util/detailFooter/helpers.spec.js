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
              useNiceFields: true
            }
            const result = getFooterPaths(mode, entityModel)
            expect(result).to.have.length(6)
          })

          test('should only return `pk` path for `update` mode and `useNiceFields=false`', () => {
            const mode = 'update'
            const entityModel = {
              useNiceFields: false
            }
            const result = getFooterPaths(mode, entityModel)
            expect(result).to.deep.equal(['pk'])
          })

          test('should not return any path for `create` mode', () => {
            const mode = 'create'
            const entityModel = {
              useNiceFields: true
            }
            const result = getFooterPaths(mode, entityModel)
            expect(result).to.have.length(0)
          })
        })

        describe('getFooterType', () => {
          test('should return `FULL` footer type for `update` mode and `useNiceFields=true`', () => {
            const mode = 'update'
            const entityModel = {
              useNiceFields: true
            }
            const result = getFooterType(mode, entityModel)
            expect(result).to.equal(types.FULL)
          })

          test('should return `REDUCED` footer type for `update` mode and `useNiceFields=false`', () => {
            const mode = 'update'
            const entityModel = {
              useNiceFields: false
            }
            const result = getFooterType(mode, entityModel)
            expect(result).to.equal(types.REDUCED)
          })

          test('should return `NONE` footer type for `create` mode', () => {
            const mode = 'create'
            const entityModel = {
              useNiceFields: true
            }
            const result = getFooterType(mode, entityModel)
            expect(result).to.equal(types.NONE)
          })
        })
      })
    })
  })
})
