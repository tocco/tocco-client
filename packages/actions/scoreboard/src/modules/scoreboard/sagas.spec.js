import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {all, select, takeEvery} from 'redux-saga/effects'
import {rest} from 'tocco-app-extensions'

import * as actions from './actions'
import rootSaga, * as sagas from './sagas'

describe('scoreboard', () => {
  describe('modules', () => {
    describe('scoreboard', () => {
      describe('sagas', () => {
        test('should fork child sagas', () => {
          const generator = rootSaga()
          expect(generator.next().value).to.deep.equal(all([takeEvery(actions.FETCH_DATA, sagas.fetchData)]))
          expect(generator.next().done).to.be.true
        })

        describe('fetchData', () => {
          const fakeResponse = {
            body: {
              participants: [
                {
                  points: 3,
                  ranking: 1,
                  participantBean: {
                    defaultDisplay: 'testName',
                    entity: 'User',
                    key: 1
                  }
                },
                {
                  points: 0,
                  ranking: 2,
                  participantBean: {
                    defaultDisplay: 'testAnotherName',
                    entity: 'User',
                    key: 2
                  }
                }
              ]
            }
          }
          const data = [
            {
              points: 3,
              ranking: 1,
              participantBean: {
                defaultDisplay: 'testName',
                entity: 'User',
                key: 1
              }
            },
            {
              points: 0,
              ranking: 2,
              participantBean: {
                defaultDisplay: 'testAnotherName',
                entity: 'User',
                key: 2
              }
            }
          ]

          test('should fetch user data', () =>
            expectSaga(sagas.fetchData)
              .provide([
                [select(sagas.inputSelector), {selection: {entityName: 'Tournament', type: 'ID', ids: ['1']}}],
                [matchers.call.fn(rest.simpleRequest), fakeResponse]
              ])
              .put(actions.setData(data))
              .run())
        })
      })
    })
  })
})
