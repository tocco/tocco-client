import reducer from './index'
import {changeStrategy} from './actions'

describe('merge', () => {
  describe('modules', () => {
    describe('mergeStrategy', () => {
      describe('strategies', () => {
        describe('reducer', () => {
          it('should create a valid initial state', () => {
            expect(reducer(undefined, {})).to.deep.equal({copyRelations: true, sourceEntityAction: 'NO_ACTION'})
          })

          it('handels new strategy', () => {
            const expectedStateAfter = {stgi1: 'old_val'}

            expect(reducer({}, changeStrategy('stgi1', 'old_val'))).to.deep.equal(expectedStateAfter)
          })

          it('handels update strategy', () => {
            const stateBefore = {stgi1: 'old_val'}
            const expectedStateAfter = {stgi1: 'new_val'}

            expect(reducer(stateBefore, changeStrategy('stgi1', 'new_val'))).to.deep.equal(expectedStateAfter)
          })
        })
      })
    })
  })
})
