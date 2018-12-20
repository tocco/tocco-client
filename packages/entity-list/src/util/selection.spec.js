import {showSelectionComponent, combineSelection} from './selection'
import selectionStyles from './selectionStyles'

describe('entity-list', () => {
  describe('util', () => {
    describe('selection', () => {
      describe('showSelectionComponent', () => {
        test.each([
          // don't show if disableSelectionController is true, show if false or undefined
          [undefined, true, true, false],
          [undefined, false, true, true],
          [undefined, undefined, true, true],

          // don't show if formSelectable is false, show if true or undefined
          [undefined, false, false, false],
          [undefined, false, true, true],
          [undefined, false, undefined, true],

          // don't show if inputSelectionStyle is SINGLE or NONE, show if MULTI or undefined
          [selectionStyles.SINGLE, false, true, false],
          [selectionStyles.NONE, false, true, false],
          [selectionStyles.MULTI, false, true, true],
          [undefined, false, true, true]
        ])(
          'inputSelectionStyle: %s, disableSelectionController: %s, formSelectable: %s, expectedResult: %s',
          (inputSelectionStyle, disableSelectionController, formSelectable, expectedResult) => {
            expect(showSelectionComponent(inputSelectionStyle, disableSelectionController, formSelectable))
              .to.equal(expectedResult)
          }
        )
      })

      describe('combineSelection', () => {
        test('should add the new selection', () => {
          const existingSelection = []
          const isSelected = true
          const keys = [1, 2, 3]

          const expectedResult = [1, 2, 3]

          const result = combineSelection(existingSelection, keys, isSelected)

          expect(result).to.deep.equal(expectedResult)
        })

        test(
          'should combine the new added selection with the existing selection',
          () => {
            const existingSelection = [1, 2, 3]

            const isSelected = true
            const keys = [4, 5, 6]

            const expectedResult = [1, 2, 3, 4, 5, 6]

            const result = combineSelection(existingSelection, keys, isSelected)

            expect(result).to.deep.equal(expectedResult)
          }
        )

        test('should avoid duplicate keys', () => {
          const existingSelection = [1, 2, 3]
          const isSelected = true
          const keys = [2, 3, 4]

          const expectedResult = [1, 2, 3, 4]

          const result = combineSelection(existingSelection, keys, isSelected)

          expect(result).to.deep.equal(expectedResult)
        })

        test(
          'should combine the new removed selection with the existing selection',
          () => {
            const existingSelection = [1, 2, 3]
            const isSelected = false
            const keys = [1, 2]

            const expectedResult = [3]

            const result = combineSelection(existingSelection, keys, isSelected)

            expect(result).to.deep.equal(expectedResult)
          }
        )
      })
    })
  })
})
