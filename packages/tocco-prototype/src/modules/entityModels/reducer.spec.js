import entityModels from './reducer'
import * as actions from './actions'

describe('Prototype', () => {
  describe('entityModels reducer', () => {
    it('should handle initial state', () => {
      expect(entityModels(undefined, {})).to.deep.equal([])
    })

    describe(actions.RECEIVE_ENTITY_MODELS, () => {
      it('should set received models', () => {
        const models = {
          entities: {
            User: {
              metaData: {
                label: 'User'
              }
            }
          }
        }
        const expected = [{
          name: 'User',
          label: 'User'
        }]
        expect(entityModels([], actions.receiveEntityModels(models))).to.deep.equal(expected)
      })
    })
  })
})
