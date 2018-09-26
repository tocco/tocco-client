import reducer from './index'
import {changeEditOptionValue, activateEditOption} from './actions'

describe('merge', () => {
  describe('modules', () => {
    describe('mergeStrategy', () => {
      describe('editOptions', () => {
        describe('reducer', () => {
          test('handels change EditOption Value', () => {
            const stateBefore = [
              {
                name: 'field1',
                value: 'old_val'
              }
            ]

            const expectedStateAfter = [
              {
                name: 'field1',
                value: 'new_val'
              }
            ]

            expect(reducer(stateBefore, changeEditOptionValue('field1', 'new_val'))).to.deep.equal(expectedStateAfter)
          })

          test('handels activate EditOption', () => {
            const stateBefore = [
              {
                name: 'field1',
                active: false
              }
            ]

            const expectedStateAfter = [
              {
                name: 'field1',
                active: true
              }
            ]

            expect(reducer(stateBefore, activateEditOption('field1', true))).to.deep.equal(expectedStateAfter)
          })
        })
      })
    })
  })
})
