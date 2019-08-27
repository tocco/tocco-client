import {call} from 'redux-saga/es/effects'

import getPreselectedValues, {getDisplay, NOT_FOUND_DISPLAY, fetchEntities} from './loadDisplaysOfRelationFields'

describe('app-extensions', () => {
  describe('form', () => {
    describe('loadDisplaysOfRelationFields', () => {
      test('should return and object with values from preselected searchfields', () => {
        const values = [
          {
            id: 'txtFulltext',
            value: ''
          },
          {
            id: 'relSingle_entity',
            value: '2'
          },
          {
            id: 'relMulti_entity',
            value: [
              '1',
              '2'
            ]
          }
        ]

        const targetEntity = 'targetEntity'

        const entityModel = {
          relSingle_entity: {type: 'relation', targetEntity, multi: false},
          relMulti_entity: {type: 'relation', targetEntity, multi: true}
        }

        const record1 = {key: '1', display: 'display1'}
        const record2 = {key: '2', display: 'display2'}

        const callRelatedEntity = sinon.spy()
        const searchFormVisible = true

        const generator = getPreselectedValues(values, entityModel, callRelatedEntity, searchFormVisible)

        expect(generator.next().value).to.deep.equal(
          call(fetchEntities, targetEntity, ['2'])
        )

        expect(generator.next([record2]).value).to.deep.equal(
          call(fetchEntities, targetEntity, ['1', '2'])
        )
        const expectedResult = {
          txtFulltext: '',
          relSingle_entity: record2,
          relMulti_entity: [record1, record2]
        }

        const next = generator.next([record1, record2])
        expect(next.value).to.deep.equal(expectedResult)
        expect(next.done).to.be.true
      }
      )
    })

    describe('getDisplay', () => {
      test('should return the not loaded display if no entites loaded', () => {
        const entities = []
        const result = getDisplay(1, entities)
        expect(result).to.eql(NOT_FOUND_DISPLAY)
      })

      test('should return the display of correct entity', () => {
        const entities = [{key: 1, display: 'test'}]
        const result = getDisplay(1, entities)
        expect(result).to.eql('test')
      })
    })
  })
})
