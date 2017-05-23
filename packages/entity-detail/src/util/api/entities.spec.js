import * as entities from './entities'
import fetchMock from 'fetch-mock'

describe('entity-detail', () => {
  describe('util', () => {
    describe('api', () => {
      describe('entities', () => {
        beforeEach(() => {
          fetchMock.reset()
          fetchMock.restore()
        })

        describe('fetchEntities', () => {
          it('should call fetch', () => {
            fetchMock.get('*', {data: [{fields: {a: 'a'}}]})

            const fields = ['f1', 'f2']
            return entities.fetchEntities('User', {
              page: 2,
              orderBy: 'firstname',
              limit: 20,
              fields: fields,
              searchInputs: {_search: 'test'}
            }).then(() => {
              expect(fetchMock.calls().matched).to.have.length(1)
              const lastCall = fetchMock.lastCall()[0]
              expect(lastCall).to.eql('/nice2/rest/entities/User?_limit=20&_offset=20&_paths=f1%2Cf2&_search=test')
            })
          })
        })

        describe('fetchEntity', () => {
          it('should call fetch', () => {
            fetchMock.get('*', {data: [{fields: {a: 'a'}}]})

            const fields = ['f1', 'f2']
            return entities.fetchEntity('User', 99, fields, 'User_detail').then(() => {
              expect(fetchMock.calls().matched).to.have.length(1)
              const lastCall = fetchMock.lastCall()[0]
              expect(lastCall).to.eql('/nice2/rest/entities/User/99?_form=User_detail&_paths=f1%2Cf2')
            })
          })
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
