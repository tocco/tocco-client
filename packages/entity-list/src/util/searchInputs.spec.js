import {getSearchInputsForRequest} from './searchInputs'

describe('entity-list', () => {
  describe('util', () => {
    describe('searchInputs', () => {
      describe('getSearchInputsForRequest', () => {
        test('should add pk to relation types', () => {
          const input = {
            relMulti_entity: [{key: '1'}, {key: '2'}],
            relSingle_entity: {key: '1'},
            field: 'some input',
            _filter: 'Filter'
          }

          const expectedResult = {
            'relMulti_entity.pk': ['1', '2'],
            'relSingle_entity.pk': '1',
            field: 'some input',
            _filter: 'Filter'
          }

          const result = getSearchInputsForRequest(input)

          expect(result).to.deep.eql(expectedResult)
        })
      })
    })
  })
})
