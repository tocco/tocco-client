import {getSearchInputsForRequest} from './searchInputs'

describe('entity-browser', () => {
  describe('util', () => {
    describe('searchInputs', () => {
      describe('getSearchInputsForRequest', () => {
        it('should add pk to relation types', () => {
          const input = {
            relMulti_entity: ['1', '2'],
            relSingle_entity: '1',
            field: 'some input'
          }

          const searchForm = {
            entityModel: {
              relMulti_entity: {
                type: 'relation'
              },
              relSingle_entity: {
                type: 'relation'
              },
              field: {
                type: 'not_a_relation'
              }
            }
          }

          const expectedResult = {
            'relMulti_entity.pk': ['1', '2'],
            'relSingle_entity.pk': '1',
            field: 'some input'
          }

          const result = getSearchInputsForRequest(input, searchForm)

          expect(result).to.deep.eql(expectedResult)
        })
      })
    })
  })
})

