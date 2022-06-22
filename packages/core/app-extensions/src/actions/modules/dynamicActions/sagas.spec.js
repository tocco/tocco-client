import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {takeLatest, all} from 'redux-saga/effects'

import rest from '../../../rest'
import * as actions from './actions'
import rootSaga, * as sagas from './sagas'

describe('app-extensions', () => {
  describe('actions', () => {
    describe('modules', () => {
      describe('dynamicActions', () => {
        describe('sagas', () => {
          describe('root saga', () => {
            test('should handle actions', () => {
              const generator = rootSaga()

              expect(generator.next().value).to.deep.equal(
                all([takeLatest(actions.FETCH_ACTION_PACKAGES, sagas.fetchActionPackages)])
              )

              expect(generator.next().done).to.be.true
            })
          })

          describe('fetchActionPackage', () => {
            test('should fetch and store actionPackages', () => {
              const actionPackages = [{packageName: 'package', appName: 'app', actionName: 'action'}]
              return expectSaga(sagas.fetchActionPackages)
                .provide([[matchers.call.fn(rest.requestSaga), {body: {actionPackages}}]])
                .call(rest.requestSaga, '/client/actionPackages', {method: 'GET'})
                .put(actions.setActionPackages(actionPackages))
                .run()
            })

            test('should store empty actionPackages when malformed body is returned', () => {
              return expectSaga(sagas.fetchActionPackages)
                .provide([[matchers.call.fn(rest.requestSaga), {body: {}}]])
                .call(rest.requestSaga, '/client/actionPackages', {method: 'GET'})
                .put(actions.setActionPackages([]))
                .run()
            })
          })
        })
      })
    })
  })
})
