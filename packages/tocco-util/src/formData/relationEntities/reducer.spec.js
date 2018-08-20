import * as actions from './actions'
import {setRelationEntities, setRelationEntitiesLoading} from './reducer'

describe('tocco-util', () => {
  describe('formData', () => {
    describe('relationEntities', () => {
      describe('reducer', () => {
        describe('setRelationEntities', () => {
          it('should add new entities', () => {
            const initialState = {
              data: {}
            }

            const entities = [
              {value: 1, label: 'User1'},
              {value: 2, label: 'User2'}
            ]

            const newState = setRelationEntities(initialState, actions.setRelationEntities('relUser', entities))

            const expectedStateAfter = {
              data: {
                relUser: {
                  data: entities,
                  isLoading: false,
                  moreEntitiesAvailable: false
                }
              }
            }

            expect(newState).to.eql(expectedStateAfter)
          })

          it('should overwrite existing entities', () => {
            const initialState = {
              data: {
                relUser2: {
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

            const newState = setRelationEntities(initialState, actions.setRelationEntities('relUser2', entities))

            const expectedStateAfter = {
              data: {
                relUser2: {
                  data: entities,
                  isLoading: false,
                  moreEntitiesAvailable: false
                }
              }
            }
            expect(newState).to.deep.eql(expectedStateAfter)
          })
        })

        describe('setRelationEntitiesLoading', () => {
          it('should set loading boolean', () => {
            const initialState = {
              data: {
                relUser2: {
                  data: []
                }

              }
            }
            const newState = setRelationEntitiesLoading(initialState, actions.setRelationEntityLoading('relUser2'))

            expect(newState.data.relUser2.isLoading).to.be.true
          })
        })
      })
    })
  })
})
