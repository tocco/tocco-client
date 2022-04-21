import * as actions from './actions'
import {setRelationEntities, setRelationEntitiesLoading} from './reducer'

describe('app-extensions', () => {
  describe('formData', () => {
    describe('relationEntities', () => {
      describe('reducer', () => {
        describe('setRelationEntities', () => {
          test('should add new entities', () => {
            const initialState = {
              data: {}
            }

            const entities = [
              {value: 1, label: 'User1'},
              {value: 2, label: 'User2'}
            ]
            const searchTerm = undefined

            const newState = setRelationEntities(
              initialState,
              actions.setRelationEntities('relUser', entities, false, searchTerm)
            )

            const expectedStateAfter = {
              data: {
                relUser: {
                  data: entities,
                  isLoading: false,
                  moreEntitiesAvailable: false,
                  searchTerm
                }
              }
            }

            expect(newState).to.eql(expectedStateAfter)
          })

          test('should overwrite existing entities', () => {
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
            const searchTerm = undefined

            const newState = setRelationEntities(
              initialState,
              actions.setRelationEntities('relUser2', entities, false, searchTerm)
            )

            const expectedStateAfter = {
              data: {
                relUser2: {
                  data: entities,
                  isLoading: false,
                  moreEntitiesAvailable: false,
                  searchTerm
                }
              }
            }
            expect(newState).to.deep.eql(expectedStateAfter)
          })

          test('should overwrite existing searchTerm', () => {
            const initialState = {
              data: {
                relUser2: {
                  data: [],
                  searchTerm: 'User1'
                }
              }
            }

            const entities = []
            const searchTerm = 'User2'

            const newState = setRelationEntities(
              initialState,
              actions.setRelationEntities('relUser2', entities, false, searchTerm)
            )

            const expectedStateAfter = {
              data: {
                relUser2: {
                  data: entities,
                  isLoading: false,
                  moreEntitiesAvailable: false,
                  searchTerm
                }
              }
            }
            expect(newState).to.deep.eql(expectedStateAfter)
          })
        })

        describe('setRelationEntitiesLoading', () => {
          test('should set loading boolean', () => {
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

          test('should clear exsting data', () => {
            const initialState = {
              data: {
                relUser2: {
                  searchTerm: 'User',
                  isLoading: false,
                  data: [
                    {value: 1, label: 'User1'},
                    {value: 2, label: 'User2'}
                  ]
                }
              }
            }
            const newState = setRelationEntitiesLoading(
              initialState,
              actions.setRelationEntityLoading('relUser2', true)
            )

            expect(newState.data.relUser2.searchTerm).to.eql(undefined)
            expect(newState.data.relUser2.data).to.eql([])
            expect(newState.data.relUser2.isLoading).to.be.true
          })

          test('should keep exsting data', () => {
            const initialState = {
              data: {
                relUser2: {
                  searchTerm: 'User',
                  isLoading: false,
                  data: [
                    {value: 1, label: 'User1'},
                    {value: 2, label: 'User2'}
                  ]
                }
              }
            }
            const newState = setRelationEntitiesLoading(
              initialState,
              actions.setRelationEntityLoading('relUser2', false)
            )

            expect(newState.data.relUser2.searchTerm).to.eql('User')
            expect(newState.data.relUser2.data).to.eql(initialState.data.relUser2.data)
            expect(newState.data.relUser2.isLoading).to.be.true
          })
        })
      })
    })
  })
})
