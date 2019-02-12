import {expectSaga} from 'redux-saga-test-plan'

import preAction from './preAction'

describe('app-extensions', () => {
  describe('actions', () => {
    describe('preAction', () => {
      describe('preAction', () => {
        const mockPreAction = (abort, params) => ({
          shouldRun: () => true,
          run: () => ({abort, params})
        })

        const actionDefinition = {}
        const ids = []

        test('should return abort = false if a preAction returns false', () => {
          return expectSaga(preAction([mockPreAction(true, {})]), actionDefinition, ids)
            .returns({abort: true, params: {}})
            .run()
        })

        test('should return abort if a preAction returns abort', () => {
          return expectSaga(preAction([mockPreAction(false, {})]), actionDefinition, ids)
            .returns({abort: false, params: {}})
            .run()
        })

        test('should not call further preAction if one return abort', async() => {
          const spyPreAction = {
            shouldRun: () => true,
            run: sinon.spy()
          }

          await expectSaga(preAction([mockPreAction(true, {})]), actionDefinition, ids).run()

          expect(spyPreAction.run).to.not.be.called
        })
      })
    })
  })
})
