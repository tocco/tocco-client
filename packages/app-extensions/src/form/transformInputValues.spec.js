import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'

import transformInputValues from './transformInputValues'
import rest from '../rest'

describe('app-extensions', () => {
  describe('form', () => {
    describe('transformInputValues', () => {
      test('should return a valid form values object', () => {
        const fields = [
          {
            id: 'txtFulltext',
            value: 'Test'
          }
        ]

        const expectedResult = {
          txtFulltext: 'Test'
        }

        return expectSaga(transformInputValues, fields, {})
          .returns(expectedResult)
          .run()
      })

      test('should load displays and add to relation field values', () => {
        const fields = [
          {
            id: 'relSingle_entity',
            value: '2'
          },
          {
            id: 'relMulti_entity',
            value: [
              '1',
              '2'
            ]
          }
        ]

        const targetEntity = 'targetEntity'

        const entityModel = {
          paths: {
            relSingle_entity: {type: 'relation', targetEntity, multi: false},
            relMulti_entity: {type: 'relation', targetEntity, multi: true}
          }
        }

        const displayMockResponse = {
          [targetEntity]: {
            1: 'Entity 1',
            2: 'Entity 2'
          }
        }

        const expectedResult = {
          relSingle_entity: {key: '2', display: 'Entity 2'},
          relMulti_entity: [
            {key: '1', display: 'Entity 1'},
            {key: '2', display: 'Entity 2'}
          ]
        }

        return expectSaga(transformInputValues, fields, entityModel)
          .provide([
            [matchers.call.fn(rest.fetchDisplays), displayMockResponse]
          ])
          .returns(expectedResult)
          .run()
      })

      test('should have a fallback if no display could have been loaded', () => {
        const fields = [
          {
            id: 'relSingle_entity',
            value: '2'
          }
        ]

        const targetEntity = 'targetEntity'

        const entityModel = {
          paths: {
            relSingle_entity: {type: 'relation', targetEntity, multi: false}
          }
        }

        const displayMockResponse = {[targetEntity]: {}}

        const expectedResult = {
          relSingle_entity: {key: '2', display: '??'}
        }

        return expectSaga(transformInputValues, fields, entityModel)
          .provide([
            [matchers.call.fn(rest.fetchDisplays), displayMockResponse]
          ])
          .returns(expectedResult)
          .run()
      })
    })
  })
})
