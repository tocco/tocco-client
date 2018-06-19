import {call} from 'redux-saga/effects'
import {loadRelationEntity as loadRelationEntityAction} from '../modules/searchForm/actions'
import * as searchForm from './searchForm'

describe('entity-list', () => {
  describe('util', () => {
    describe('searchForm', () => {
      describe('getInitialFromValues', () => {
        it('should return and object with values from preselected saerchfields', () => {
          const preSelectedSearchFields = [
            {
              'id': 'txtFulltext',
              'value': '',
              'hidden': false
            },
            {
              'id': 'relSingle_entity',
              'value': '2',
              'hidden': false
            },
            {
              'id': 'relMulti_entity',
              'value': [
                '1',
                '2'
              ],
              'hidden': false
            }
          ]

          const targetEntity = 'targetEntity'

          const entityModel = {
            relSingle_entity: {type: 'relation', targetEntity},
            relMulti_entity: {type: 'relation', targetEntity}
          }

          const record1 = {key: '1', display: 'display1'}
          const record2 = {key: '2', display: 'display2'}

          const callRelatedEntity = sinon.spy()
          const searchFormVisible = true

          const generator = searchForm.getPreselectedValues(
            preSelectedSearchFields, entityModel, callRelatedEntity, searchFormVisible
          )
          expect(generator.next().value).to.deep.equal(call(callRelatedEntity, loadRelationEntityAction(targetEntity)))
          expect(generator.next([record1, record2]).value).to.deep.equal(
            call(callRelatedEntity, loadRelationEntityAction(targetEntity))
          )

          const expectedResult = {
            txtFulltext: '',
            relSingle_entity: record2,
            relMulti_entity: [record1, record2]
          }

          const next = generator.next([record1, record2])
          expect(next.value).to.deep.equal(expectedResult)
          expect(next.done).to.be.true
        })
      })

      describe('getDisplay', () => {
        it('should return the not loaded display if no entites loaded', () => {
          const entities = []
          const result = searchForm.getDisplay(1, entities)
          expect(result).to.eql(searchForm.NOT_LOADED_DISPLAY)
        })

        it('should return the display of correct entity', () => {
          const entities = [{key: 1, display: 'test'}]
          const result = searchForm.getDisplay(1, entities)
          expect(result).to.eql('test')
        })
      })
    })
  })
})
