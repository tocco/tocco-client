import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {throwError} from 'redux-saga-test-plan/providers'
import {select} from 'redux-saga/effects'
import {rest} from 'tocco-app-extensions'

import * as actions from './actions'
import * as sagas from './sagas'

describe('score', () => {
  describe('modules', () => {
    describe('scoreboard', () => {
      describe('sagas', () => {
        describe('fetchData', () => {
          test('should read Tournament-Data from rest-API', () => {
            const resultData = [
              {
                resultUserBean: {
                  key: '11947',
                  entity: 'User',
                  defaultDisplay: 'Hoff, Lorenz'
                },
                points: 12,
                place: 1
              }
            ]
            const response = {
              body: {
                resultBeans: [
                  {
                    resultUserBean: {
                      key: '11947',
                      entity: 'User',
                      defaultDisplay: 'Hoff, Lorenz'
                    },
                    points: 12,
                    place: 1
                  }
                ],
                tournamentName: 'TurnierDerWälder'
              }
            }
            return expectSaga(sagas.fetchData)
              .provide([
                [select(sagas.inputSelector), {selection: {entityName: 'Tournament', ids: ['47'], type: 'ID'}}],
                [matchers.call.fn(rest.simpleRequest), response]
              ])
              .put(actions.setData(resultData))
              .run()
          })
          test('should handle error', () => {
            return expectSaga(sagas.fetchData)
              .provide([
                [select(sagas.inputSelector), {selection: {entityName: 'Tournament', ids: ['47'], type: 'ID'}}],
                [matchers.call.fn(rest.simpleRequest), throwError(new Error('Failed to fetch data'))]
              ])
              .put(actions.setData(null))
              .run()
          })
        })
      })
    })
  })
})
