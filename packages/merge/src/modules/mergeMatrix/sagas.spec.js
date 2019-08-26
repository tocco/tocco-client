import {put, select} from 'redux-saga/effects'

import * as sagas from './sagas'
import {selectSourceField, selectSourceRelation} from './selections/actions'

describe('merge', () => {
  describe('modules', () => {
    describe('MergeMatrix', () => {
      describe('sagas', () => {
        describe('selectTargetEntityFields', () => {
          test('should dispatch the selection of new target entity', () => {
            const generator = sagas.selectTargetEntityFields({payload: {pk: '1'}})

            const state = {
              model: {
                fields: [
                  {label: 'First Name', name: 'firstname'},
                  {label: 'Last Name', name: 'lastname'}],
                relations: [
                  {name: 'rel_one', toMany: false},
                  {name: 'rel_many', toMany: true}
                ]
              }
            }

            expect(generator.next().value).to.deep.equal(select(sagas.mergeMatrixSelector))

            expect(generator.next(state).value).to.deep.equal(
              [
                put(selectSourceField('firstname', '1')),
                put(selectSourceField('lastname', '1'))
              ]
            )

            expect(generator.next().value).to.deep.equal([put(selectSourceRelation('rel_one', '1'))])
            expect(generator.next().done).to.equal(true)
          })
        })
      })
    })
  })
})
