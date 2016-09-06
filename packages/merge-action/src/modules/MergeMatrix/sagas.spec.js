import {call, put, select} from 'redux-saga/effects'
import * as sagas from './sagas'
import {selectSourceField, selectSourceRelation} from './selections/actions'
import createMergeResult from './../../utils/MergeActionResult'
import invokeExternalEvent from './../../utils/ExternalEvents'

describe('merge-action', () => {
  describe('module sagas ', () => {
    describe('selectTargetEntityFields', () => {
      it('should dispatch the selection of new target entity', () => {
        const generator = sagas.selectTargetEntityFields({pk: '1'})

        var state = {
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

    describe('save', () => {
      it('should extract mergeResult from state and send dwr request', () => {
        const generator = sagas.save()

        var state = {}
        var result = {}

        expect(generator.next().value).to.deep.equal(select(sagas.mergeMatrixSelector))
        expect(generator.next(state).value).to.eql(call(createMergeResult, state))
        expect(generator.next(result).value).to.eql(call(sagas.sendDwr, result))
        expect(generator.next().value).to.eql(call(invokeExternalEvent, 'close'))
        expect(generator.next().done).to.equal(true)
      })

    })
  })

})
