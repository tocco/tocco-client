import {rest} from 'tocco-app-extensions'
import fetchMock from 'fetch-mock'
import {call} from 'redux-saga/effects'

import * as entities from './entities'

describe('entity-detail', () => {
  describe('util', () => {
    describe('api', () => {
      describe('entities', () => {
        beforeEach(() => {
          fetchMock.reset()
          fetchMock.restore()
        })

        describe('updateEntity', () => {
          test('should call request saga', () => {
            const entity = {
              model: 'User',
              key: '1'
            }

            const gen = entities.updateEntity(entity, ['f1', 'f2'])

            expect(gen.next().value).to.eql(call(
              rest.requestSaga,
              'entities/2.0/User/1',
              {
                body: entity,
                method: 'PATCH',
                queryParams: {
                  _paths: 'f1,f2'
                },
                acceptedErrorCodes: ['VALIDATION_FAILED']
              }
            ))

            const resp = {
              body: {}
            }

            const next = gen.next(resp)

            expect(next.value).to.equal(resp.body) // expect same (not just equal)
            expect(next.done).to.be.true
          })
        })
      })
    })
  })
})
