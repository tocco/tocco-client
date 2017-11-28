import {combineSelection} from './selection'

describe('entity-list', () => {
  describe('util', () => {
    describe('selection', () => {
      describe('combineSelection', () => {
        it('should add the new selection', () => {
          const existingSelection = []
          const selection = {
            isSelected: true,
            keys: [1, 2, 3]
          }

          const expectedResult = [1, 2, 3]

          const result = combineSelection(existingSelection, selection)

          expect(result).to.deep.equal(expectedResult)
        })

        it('should combine the new added selection with the existing selection', () => {
          const existingSelection = [1, 2, 3]
          const selection = {
            isSelected: true,
            keys: [4, 5, 6]
          }

          const expectedResult = [1, 2, 3, 4, 5, 6]

          const result = combineSelection(existingSelection, selection)

          expect(result).to.deep.equal(expectedResult)
        })

        it('should avoid duplicate keys', () => {
          const existingSelection = [1, 2, 3]
          const selection = {
            isSelected: true,
            keys: [2, 3, 4]
          }

          const expectedResult = [1, 2, 3, 4]

          const result = combineSelection(existingSelection, selection)

          expect(result).to.deep.equal(expectedResult)
        })

        it('should combine the new removed selection with the existing selection', () => {
          const existingSelection = [1, 2, 3]
          const selection = {
            isSelected: false,
            keys: [1, 2]
          }

          const expectedResult = [3]

          const result = combineSelection(existingSelection, selection)

          expect(result).to.deep.equal(expectedResult)
        })
      })
    })
  })
})
