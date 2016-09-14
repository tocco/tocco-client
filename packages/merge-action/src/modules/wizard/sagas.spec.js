import {call, put, select} from 'redux-saga/effects'
import * as sagas from './sagas'
import createMergeResult from './../../utils/MergeActionResult'
import invokeExternalEvent from './../../utils/ExternalEvents'

describe('merge-action', () => {
  describe('wizard module sagas', () => {
    describe('save', () => {
      it('should extract mergeResult from state and send dwr request', () => {
        const generator = sagas.save()

        var state = {}
        var result = {}

        expect(generator.next().value).to.deep.equal(select())
        expect(generator.next(state).value).to.eql(call(createMergeResult, state))
        expect(generator.next(result).value).to.eql(call(sagas.sendDwr, result))
        expect(generator.next().value).to.eql(call(invokeExternalEvent, 'close'))
        expect(generator.next().done).to.equal(true)
      })

    })
  })

})
