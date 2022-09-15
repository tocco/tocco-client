import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {rest} from 'tocco-app-extensions'
import {env} from 'tocco-util'

import * as entities from './entities'

describe('entity-detail', () => {
  describe('util', () => {
    describe('api', () => {
      describe('entities', () => {
        beforeEach(() => {
          env.setWidgetConfigKey(undefined)
        })

        describe('updateEntity', () => {
          test('should call request saga', async () => {
            const entity = {
              model: 'User',
              key: '1'
            }

            const resource = 'entities/2.0/User/1'
            const options = {
              method: 'PATCH',
              queryParams: {
                _paths: 'f1,f2'
              },
              body: entity,
              acceptedErrorCodes: ['VALIDATION_FAILED'],
              acceptedStatusCodes: [404, 409]
            }
            const body = {}
            const status = 200
            return expectSaga(entities.updateEntity, entity, [], ['f1', 'f2'])
              .provide([[matchers.call(rest.requestSaga, resource, options), {body, status}]])
              .run()
          })
        })

        describe('createEntity', () => {
          const entity = {
            model: 'User'
          }
          const formDefinition = {
            createEndpoint: 'test/customEndpoint'
          }
          const headers = new Headers({
            Location: 'http://localhost/'
          })
          const status = 201

          test('no custom endpoint defined and without widget config key', async () => {
            const resource = 'entities/2.0/User'
            const options = {
              method: 'POST',
              queryParams: {
                _paths: ''
              },
              body: entity,
              acceptedErrorCodes: ['VALIDATION_FAILED'],
              acceptedStatusCodes: [403, 409]
            }

            return expectSaga(entities.createEntity, entity, [], {})
              .provide([[matchers.call(rest.requestSaga, resource, options), {headers, status}]])
              .run()
          })

          test('no custom endpoint defined and with widget config key', async () => {
            const resource = 'entities/2.0/User'
            const options = {
              method: 'POST',
              queryParams: {
                _paths: '',
                _widget_key: '1'
              },
              body: entity,
              acceptedErrorCodes: ['VALIDATION_FAILED'],
              acceptedStatusCodes: [403, 409]
            }

            env.setWidgetConfigKey('1')

            return expectSaga(entities.createEntity, entity, [], {})
              .provide([[matchers.call(rest.requestSaga, resource, options), {headers, status}]])
              .run()
          })

          test('custom endpoint defined and with widget config key', async () => {
            const resource = 'test/customEndpoint'
            const options = {
              method: 'POST',
              queryParams: {
                _paths: '',
                _widget_key: '1'
              },
              body: entity,
              acceptedErrorCodes: ['VALIDATION_FAILED'],
              acceptedStatusCodes: [403, 409]
            }

            env.setWidgetConfigKey('1')

            return expectSaga(entities.createEntity, entity, [], formDefinition)
              .provide([[matchers.call(rest.requestSaga, resource, options), {headers, status}]])
              .run()
          })

          test('custom endpoint defined and without widget config key', async () => {
            const resource = 'test/customEndpoint'
            const options = {
              method: 'POST',
              queryParams: {
                _paths: ''
              },
              body: entity,
              acceptedErrorCodes: ['VALIDATION_FAILED'],
              acceptedStatusCodes: [403, 409]
            }

            return expectSaga(entities.createEntity, entity, [], formDefinition)
              .provide([[matchers.call(rest.requestSaga, resource, options), {headers, status}]])
              .run()
          })
        })
      })
    })
  })
})
