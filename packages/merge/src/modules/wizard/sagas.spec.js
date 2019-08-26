import {externalEvents} from 'tocco-app-extensions'
import {call, put, select} from 'redux-saga/effects'

import * as sagas from './sagas'
import createMergeResult from './../../utils/MergeActionResult'
import {setMergeResponse} from './actions'

describe('merge', () => {
  describe('modules', () => {
    describe('wizard', () => {
      describe('sagas', () => {
        describe('save', () => {
          test('should extract mergeResult from state and send dwr request', () => {
            const generator = sagas.save()

            const state = {}
            const result = {}

            const mergeResult = {}

            expect(generator.next().value).to.deep.equal(select())
            expect(generator.next(state).value).to.eql(call(createMergeResult, state))
            expect(generator.next(result).value).to.eql(call(sagas.sendDwr, result))
            expect(generator.next(mergeResult).value).to.eql(put(externalEvents.fireExternalEvent('close')))
            expect(generator.next().done).to.equal(true)
          })

          test('should handle respsonse with problems', () => {
            const generator = sagas.save()

            const mergeResponse = {notCopiedRelations: [{}]}

            generator.next()
            generator.next()
            generator.next()
            expect(generator.next(mergeResponse).value).to.eql(put(setMergeResponse(mergeResponse)))
            expect(generator.next().done).to.equal(true)
          })
        })
      })
    })
  })
})
