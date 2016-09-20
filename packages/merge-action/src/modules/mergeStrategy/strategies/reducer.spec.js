import reducer from './index'
import {changeStrategy} from './actions'

describe('merge-action', () => {
  describe('module mergeStrategy sagas', () => {
    describe('strategies reducer', () => {
      it('should create a valid initial state', () => {
        expect(reducer(undefined, {})).to.deep.equal({copyRelations: false, sourceEntityAction: 'NO_ACTION'})
      });

      it('handels new strategy', () => {
        var expectedStateAfter =
        {
          stgi1: 'old_val'
        }

        expect(reducer({}, changeStrategy('stgi1', 'old_val'))).to.deep.equal(expectedStateAfter)
      });

      it('handels update strategy', () => {
        var stateBefore = {
          stgi1: 'old_val'
        }

        var expectedStateAfter =
        {
          stgi1: 'new_val'
        }

        expect(reducer(stateBefore, changeStrategy('stgi1', 'new_val'))).to.deep.equal(expectedStateAfter)
      });
    })
  })

})
