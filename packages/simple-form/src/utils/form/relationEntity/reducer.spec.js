import * as actions from './actions'
import {setRelationEntity, setRelationEntityLoaded} from './reducer'

describe('utils', () => {
  describe('setRelationEntityReducer', () => {
    it('should add new entities', () => {
      const stateBefore = {
        relationEntities: {}
      }

      const entities = [
        {value: 1, label: 'User1'},
        {value: 2, label: 'User2'}
      ]
      const newState = setRelationEntity(stateBefore, actions.setRelationEntity('User', entities))

      const expectedStateAfter = {
        relationEntities: {
          User: {
            data: entities
          }
        }
      }

      expect(newState).to.eql(expectedStateAfter)
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

      expect(setRelationEntity(stateBefore, actions.setRelationEntity('User', entities)))
        .to.deep.equal(expectedStateAfter)
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
      expect(setRelationEntity(stateBefore, actions.setRelationEntity('User', entities, true)))
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
      expect(setRelationEntityLoaded(stateBefore, actions.setRelationEntity('User')))
        .to.deep.equal(expectedStateAfter)
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
      expect(setRelationEntityLoaded(stateBefore, actions.setRelationEntity('User')))
        .to.deep.equal(expectedStateAfter)
    })
  })
})
