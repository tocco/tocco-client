import {ExternalEvents} from 'tocco-util'
import {call, put, select} from 'redux-saga/effects'
import * as sagas from './sagas'
import createMergeResult from './../../utils/MergeActionResult'
import {setMergeResponse} from './actions'

describe('action-merge', () => {
  describe('wizard module sagas', () => {
    describe('save', () => {
      it('should extract mergeResult from state and send dwr request', () => {
        const generator = sagas.save()

        var state = {}
        var result = {}

        var mergeResult = {}

        expect(generator.next().value).to.deep.equal(select())
        expect(generator.next(state).value).to.eql(call(createMergeResult, state))
        expect(generator.next(result).value).to.eql(call(sagas.sendDwr, result))
        expect(generator.next(mergeResult).value).to.eql(call(ExternalEvents.invokeExternalEvent, 'close'))
        expect(generator.next().done).to.equal(true)
      })

      it('should handle respsonse with problems', () => {
        const generator = sagas.save()

        var mergeResponse = {notCopiedRelations: [{}]}

        generator.next()
        generator.next()
        generator.next()
        expect(generator.next(mergeResponse).value).to.eql(put(setMergeResponse(mergeResponse)))
        expect(generator.next().done).to.equal(true)
      })
    })
  })
})
