import {combineSelection} from './selection'

describe('entity-list', () => {
  describe('util', () => {
    describe('selection', () => {
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
