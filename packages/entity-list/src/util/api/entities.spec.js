import * as entities from './entities'

describe('entity-list', () => {
  describe('util', () => {
    describe('api', () => {
      describe('entities', () => {
        describe('entitiesListTransformer', () => {
          test('should return an array with flatten attributes', () => {
            const fetchResult = {
              data: [
                {
                  paths: {
                    firstname: {
                      type: 'field',
                      value: {
                        type: 'string',
                        value: 'Jon'
                      }
                    },
                    relGender: {
                      type: 'entity',
                      value: {
                        key: '1',
                        model: 'Gender',
                        display: 'Male'
                      }
                    },
                    titles: {
                      type: 'entity-list',
                      value: [{
                        key: '1',
                        model: 'title',
                        display: 'Dr.'
                      }, {
                        key: '3',
                        model: 'title',
                        display: 'Bundesrat'
                      }]
                    }
                  }
                },
                {
                  paths: {
                    firstname: {
                      type: 'field',
                      value: {
                        type: 'string',
                        value: 'Klaus'
                      }
                    },
                    relGender: {
                      type: 'entity',
                      value: {
                        key: '1',
                        model: 'Gender',
                        display: 'Female'
                      }
                    },
                    titles: {
                      type: 'entity-list',
                      value: [{
                        key: '1',
                        model: 'title',
                        display: 'Dr.'
                      }, {
                        key: '2',
                        model: 'title',
                        display: 'Prof'
                      }]
                    }
                  }
                }
              ]
            }

            const transformedResult = entities.entitiesListTransformer(fetchResult)

            expect(transformedResult).to.be.a('array')
            expect(transformedResult).to.have.length(2)

            expect(transformedResult[0]).to.have.property('firstname')
            expect(transformedResult[0]).to.have.property('relGender')
            expect(transformedResult[0].firstname).to.eql('Jon')
            expect(transformedResult[0].relGender).to.eql({key: '1', model: 'Gender', display: 'Male'})
            expect(transformedResult[0].titles).to.eql(
              [{key: '1', model: 'title', display: 'Dr.'}, {key: '3', model: 'title', display: 'Bundesrat'}]
            )

            expect(transformedResult[1]).to.have.property('firstname')
            expect(transformedResult[1]).to.have.property('relGender')
            expect(transformedResult[1].firstname).to.eql('Klaus')
            expect(transformedResult[1].titles).to.eql(
              [{key: '1', model: 'title', display: 'Dr.'}, {key: '2', model: 'title', display: 'Prof'}]
            )
          })

          test('should add __key to entity', () => {
            const fetchResult = {
              data: [
                {
                  key: 1,
                  paths: {}
                }, {
                  key: 22,
                  paths: {}
                }
              ]
            }

            const transformedResult = entities.entitiesListTransformer(fetchResult)

            expect(transformedResult[0]).to.have.property('__key')
            expect(transformedResult[0].__key).to.eql(1)

            expect(transformedResult[1]).to.have.property('__key')
            expect(transformedResult[1].__key).to.eql(22)
          })

          test('should handle path type display-expression', () => {
            const fetchResult = {
              data: [
                {
                  paths: {
                    title: {
                      name: 'title',
                      type: 'display-expression',
                      value: '<p>TEST 1</p>'
                    }
                  }
                }, {
                  paths: {
                    title: {
                      name: 'title',
                      type: 'display-expression',
                      value: '<p>TEST 2</p>'
                    }
                  }
                }
              ]
            }

            const transformedResult = entities.entitiesListTransformer(fetchResult)

            expect(transformedResult).to.be.a('array')
            expect(transformedResult).to.have.length(2)

            expect(transformedResult[0]).to.have.property('title')
            expect(transformedResult[0].title).to.eql('<p>TEST 1</p>')

            expect(transformedResult[1]).to.have.property('title')
            expect(transformedResult[1].title).to.eql('<p>TEST 2</p>')
          })
        })
      })
    })
  })
})
