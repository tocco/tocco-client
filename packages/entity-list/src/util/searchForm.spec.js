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

          const generator = searchForm.getInitialFromValues(preSelectedSearchFields, entityModel, callRelatedEntity)
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
    })
  })
})
