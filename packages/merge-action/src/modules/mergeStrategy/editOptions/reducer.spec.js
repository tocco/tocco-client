import reducer from './index'
import {changeEditOptionValue, activateEditOption} from './actions'

describe('merge-action', () => {
  describe('module mergeStrategy sagas', () => {
    describe('edit reducer', () => {
      it('handels change EditOption Value', () => {

        var stateBefore = [
          {
            name: 'field1',
            value: 'old_val'
          }
        ]

        var expectedStateAfter = [
          {
            name: 'field1',
            value: 'new_val'
          }
        ]

        expect(reducer(stateBefore, changeEditOptionValue('field1', 'new_val'))).to.deep.equal(expectedStateAfter)
      });

      it('handels activate EditOption', () => {
        var stateBefore = [
          {
            name: 'field1',
            active: false
          }
        ]

        var expectedStateAfter = [
          {
            name: 'field1',
            active: true
          }
        ]

        expect(reducer(stateBefore, activateEditOption('field1', true))).to.deep.equal(expectedStateAfter)
      });
    })
  })

})
