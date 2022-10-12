import {isDirty as isDirtySelector} from 'redux-form'
import {channel} from 'redux-saga'
import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'

import {setFormSubmissionFailed, setFormSubmitted, submitForm} from '../entityDetail/actions'
import {pendingChangesHandler, promptConfirm} from './sagas'

const definition = {
  id: 'my-action'
}
describe('entity-detail', () => {
  describe('modules', () => {
    describe('actions', () => {
      describe('sagas', () => {
        describe('pendingChangesHandler', () => {
          test('should continue when form is not dirty', () => {
            return expectSaga(pendingChangesHandler, {definition})
              .provide([matchers.call.fn(isDirtySelector), () => false])
              .returns({abort: false})
              .run()
          })

          test('should continue when form changes should not be saved', () => {
            return expectSaga(pendingChangesHandler, {definition})
              .provide([
                [matchers.call.fn(isDirtySelector), () => true],
                [matchers.call.fn(promptConfirm), 'continue']
              ])
              .returns({abort: false})
              .run()
          })

          test('should abort when user aborts prompt', () => {
            return expectSaga(pendingChangesHandler, {definition})
              .provide([
                [matchers.call.fn(isDirtySelector), () => true],
                [matchers.call.fn(promptConfirm), 'abort']
              ])
              .returns({abort: true})
              .run()
          })

          test('should submit form and continue after successfully saved it', () => {
            return expectSaga(pendingChangesHandler, {definition})
              .provide([
                [matchers.call.fn(isDirtySelector), () => true],
                [matchers.call.fn(promptConfirm), 'save']
              ])
              .put(submitForm())
              .dispatch(setFormSubmitted())
              .returns({abort: false})
              .run()
          })

          test('should submit form and abort after submission failed', () => {
            return expectSaga(pendingChangesHandler, {definition})
              .provide([
                [matchers.call.fn(isDirtySelector), () => true],
                [matchers.call.fn(promptConfirm), 'save']
              ])
              .put(submitForm())
              .dispatch(setFormSubmissionFailed())
              .returns({abort: true})
              .run()
          })
        })

        describe('promptConfirm', () => {
          test('should show modal', () => {
            return expectSaga(promptConfirm, 'my-action')
              .put.like({action: {type: 'notification/MODAL'}})
              .run()
          })

          test('should return modal answer', () => {
            const fakeChannel = {
              take() {},
              flush() {},
              close() {},
              put() {}
            }

            return expectSaga(promptConfirm, 'my-action')
              .provide([
                [matchers.call.fn(channel), fakeChannel],
                {
                  take: (effect, next) => (effect.channel === fakeChannel ? 'save' : next())
                }
              ])
              .put.like({action: {type: 'notification/MODAL'}})
              .returns('save')
              .run()
          })
        })
      })
    })
  })
})
