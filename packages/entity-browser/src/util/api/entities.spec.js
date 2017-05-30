import * as entities from './entities'
import fetchMock from 'fetch-mock'

describe('entity-browser', () => {
  describe('util', () => {
    describe('api', () => {
      describe('entities', () => {
        beforeEach(() => {
          fetchMock.reset()
          fetchMock.restore()
        })

        describe('fetchModel', () => {
          it('should call fetch', () => {
            fetchMock.get('*', {})
            return entities.fetchModel('User', () => {
            }).then(() => {
              expect(fetchMock.calls().matched).to.have.length(1)
              const lastCallUrl = fetchMock.lastCall()[0]
              expect(lastCallUrl).to.eql('/nice2/rest/entities/User/model')
            })
          })

          describe('defaultModelTransformer', () => {
            it('should return an object with field names as key', () => {
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
})
