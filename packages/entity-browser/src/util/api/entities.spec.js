import {rest} from 'tocco-app-extensions'
import {call} from 'redux-saga/effects'

import * as entities from './entities'

describe('entity-browser', () => {
  describe('util', () => {
    describe('api', () => {
      describe('entities', () => {
        describe('fetchModel', () => {
          test('should call request saga and transform response', () => {
            const gen = entities.fetchModel('User')

            expect(gen.next().value).to.eql(call(rest.requestSaga, 'entities/User/model'))

            const resp = {
              body: {
                name: 'User',
                fields: [{
                  fieldName: 'firstname'
                }],
                relations: [{
                  relationName: 'relUser_status',
                  targetEntity: 'User_status'
                }]
              }
            }

            expect(gen.next(resp).value).to.eql(call(entities.defaultModelTransformer, resp.body))

            const transformedResponse = {
              firstname: {
                fieldName: 'firstname'
              },
              relUser_status: {
                relationName: 'relUser_status',
                targetEntity: 'User_status',
                type: 'relation'
              }
            }

            const next = gen.next(transformedResponse)

            expect(next.value).to.eql(transformedResponse)
            expect(next.done).to.be.true
          })
        })

        describe('defaultModelTransformer', () => {
          test('should return an object with field names as key', () => {
            const fetchResult = {
              name: 'User',
              fields: [
                {
                  fieldName: 'pk',
                  type: 'serial'
                },
                {
                  fieldName: 'firstname',
                  type: 'string'
                }
              ],
              relations: [
                {
                  relationName: 'some_relation',
                  targetEntity: 'Address',
                  multi: true
                }
              ]
            }
            const result = entities.defaultModelTransformer(fetchResult)
            const expectedResult = {
              pk: {
                fieldName: 'pk',
                type: 'serial'

              },
              firstname: {
                fieldName: 'firstname',
                type: 'string'
              },
              some_relation: {
                type: 'relation',
                relationName: 'some_relation',
                targetEntity: 'Address',
                multi: true
              }
            }
            expect(result).to.eql(expectedResult)
          })
        })
      })
    })
  })
})
