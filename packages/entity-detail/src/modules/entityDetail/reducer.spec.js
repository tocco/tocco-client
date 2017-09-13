import reducer from './index'
import * as actions from './actions'

const EXPECTED_INITIAL_STATE = {
  formDefinition: {},
  entity: {},
  entityModel: {},
  entityName: '',
  formName: '',
  mode: 'update',
  relationEntities: {},
  remoteEntities: {},
  touched: false
}

describe('entity-detail', () => {
  describe('modules', () => {
    describe('entityDetail', () => {
      describe('reducer', () => {
        it('should create a valid initial state', () => {
          expect(reducer(undefined, {})).to.deep.equal(EXPECTED_INITIAL_STATE)
        })

        it('should handle an action', () => {
          const stateBefore = {
            entity: ''
          }

          const expectedStateAfter = {
            entity: 'User'
          }

          expect(reducer(stateBefore, actions.setEntity('User'))).to.deep.equal(expectedStateAfter)
        })

        describe('setRelationEntity', () => {
          it('should add new entities', () => {
            const stateBefore = {
              relationEntities: {}
            }

            const entities = [
              {value: 1, label: 'User1'},
              {value: 2, label: 'User2'}
            ]

            const expectedStateAfter = {
              relationEntities: {
                User: {
                  data: entities
                }
              }
            }
            expect(reducer(stateBefore, actions.setRelationEntity('User', entities))).to.deep.equal(expectedStateAfter)
          })

          it('should add entities to existing and do not override', () => {
            const stateBefore = {
              relationEntities: {
                User: {
                  data: [
                    {value: 1, label: 'User1'},
                    {value: 2, label: 'User2'}
                  ]
                }
              }
            }

            const entities = [
              {value: 2, label: 'User2 new'},
              {value: 3, label: 'User3'}
            ]

            const expectedStateAfter = {
              relationEntities: {
                User: {
                  data: [
                    {value: 1, label: 'User1'},
                    {value: 2, label: 'User2'},
                    {value: 3, label: 'User3'}
                  ]
                }
              }
            }
            expect(reducer(stateBefore, actions.setRelationEntity('User', entities))).to.deep.equal(expectedStateAfter)
          })

          it('should add entities to existing and override with reset', () => {
            const stateBefore = {
              relationEntities: {
                User: {
                  data: [
                    {value: 1, label: 'User1'},
                    {value: 2, label: 'User2'}
                  ]
                }
              }
            }

            const entities = [
              {value: 2, label: 'User2 new'},
              {value: 3, label: 'User3'}
            ]

            const expectedStateAfter = {
              relationEntities: {
                User: {
                  data: [
                    {value: 2, label: 'User2 new'},
                    {value: 3, label: 'User3'}
                  ]
                }
              }
            }
            expect(reducer(stateBefore, actions.setRelationEntity('User', entities, true)))
              .to.deep.equal(expectedStateAfter)
          })
        })

        describe('setRelationEntityLoaded', () => {
          it('should set loaded', () => {
            const stateBefore = {
              relationEntities: {
                User: {
                  loaded: false
                }
              }
            }

            const expectedStateAfter = {
              relationEntities: {
                User: {
                  loaded: true
                }
              }
            }
            expect(reducer(stateBefore, actions.setRelationEntityLoaded('User'))).to.deep.equal(expectedStateAfter)
          })

          it('should handle empty entity', () => {
            const stateBefore = {
              relationEntities: {}
            }

            const expectedStateAfter = {
              relationEntities: {
                User: {
                  loaded: true
                }
              }
            }
            expect(reducer(stateBefore, actions.setRelationEntityLoaded('User'))).to.deep.equal(expectedStateAfter)
          })
        })

        describe('setRemoteEntity', () => {
          it('should set entities with loaded flag', () => {
            const stateBefore = {
              remoteEntities: {
                relUser: {
                  entities: []
                }
              }
            }

            const fieldName = 'relUser2'
            const remoteEntities = [
              {key: 1, label: 'One'},
              {key: 2, label: 'Two'}
            ]

            const expectedStateAfter = {
              remoteEntities: {
                relUser: {
                  entities: []
                },
                [fieldName]: {
                  entities: remoteEntities,
                  loading: false,
                  moreOptionsAvailable: false
                }
              }
            }

            expect(reducer(stateBefore, actions.setRemoteEntity(fieldName, remoteEntities, false)))
              .to.deep.equal(expectedStateAfter)
          })

          it('should set entities with moreOptionsAvailable flag', () => {
            const stateBefore = {
              remoteEntities: {
                relUser: {
                  entities: []
                }
              }
            }

            const fieldName = 'relUser2'
            const remoteEntities = [
              {key: 1, label: 'One'},
              {key: 2, label: 'Two'}
            ]

            const expectedStateAfter = {
              remoteEntities: {
                relUser: {
                  entities: []
                },
                [fieldName]: {
                  entities: remoteEntities,
                  loading: false,
                  moreOptionsAvailable: true
                }
              }
            }

            expect(reducer(stateBefore, actions.setRemoteEntity(fieldName, remoteEntities, true)))
              .to.deep.equal(expectedStateAfter)
          })

          describe('setRemoteEntityLoading', () => {
            it('should set loading flag', () => {
              const stateBefore = {
                remoteEntities: {
                  relUser: {
                    entities: []
                  },
                  relUser2: {
                    entities: [],
                    loading: false
                  }
                }
              }

              const fieldName = 'relUser2'

              const expectedStateAfter = {
                remoteEntities: {
                  relUser: {
                    entities: []
                  },
                  [fieldName]: {
                    entities: [],
                    loading: true
                  }
                }
              }

              expect(reducer(stateBefore, actions.setRemoteEntityLoading(fieldName))).to.deep.equal(expectedStateAfter)
            })
          })
        })

        describe('SET_TOUCHED', () => {
          it('should handle SET_TOUCHED', () => {
            const stateBefore = {
              otherProp: 'foo',
              touched: false
            }

            const expectedStateAfter = {
              otherProp: 'foo',
              touched: true
            }
            expect(reducer(stateBefore, actions.setTouched(true))).to.deep.equal(expectedStateAfter)
          })
        })
      })
    })
  })
})
