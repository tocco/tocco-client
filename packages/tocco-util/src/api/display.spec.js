import {getDisplayRequest} from './display'

describe('entity-list', () => {
  describe('util', () => {
    describe('api', () => {
      describe('display', () => {
        describe('getDisplayRequest', () => {
          test('should find unloaded relation entities and put into request return object', () => {
            const entities = [
              {__key: '1', __model: 'User', relMulti_entity1: [{model: 'Multi_entity', key: '11'}]},
              {
                __key: '2',
                __model: 'User',
                relMulti_entity1: [
                  {model: 'Multi_entity', key: '22'},
                  {model: 'Multi_entity', key: '44'}]
              },
              {__key: '3', __model: 'User', relMulti_entity1: [{model: 'Multi_entity', key: '11'}]},
              {__key: '4', __model: 'User', relMulti_entity2: [{model: 'Multi_entity2', key: '1'}]}
            ]
            const relationFields = ['relMulti_entity1', 'relMulti_entity2']
            const lazyData = {
              defaultDisplays: {
                Multi_entity: {
                  22: 'Display 1'
                }
              }
            }

            const result = getDisplayRequest(entities, relationFields, lazyData)

            const expectedResult = {Multi_entity: ['11', '44'], Multi_entity2: ['1']}
            expect(result).to.eql(expectedResult)
          })
        })
      })
    })
  })
})
