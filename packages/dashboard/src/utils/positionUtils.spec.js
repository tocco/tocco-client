import {mapColAndRowToPosition, mapPositionToColAndRow, prepareInfoBoxes} from './positionUtils'

describe('dashboard', () => {
  describe('utils', () => {
    describe('positionUtils', () => {
      describe('mapPositionToColAndRow', () => {
        test('should map extract row and column from position string', () => {
          const position = '1:2'
          const {col, row} = mapPositionToColAndRow(position)
          expect(col).to.equal(0)
          expect(row).to.equal(2)
        })
        test('should handle 0:0 as 1:0', () => {
          const position = '0:0'
          const {col, row} = mapPositionToColAndRow(position)
          expect(col).to.equal(0)
          expect(row).to.equal(0)
        })
      })

      describe('mapColAndRowToPosition', () => {
        test('should map extract row and column from position string', () => {
          const col = 0
          const row = 2
          const position = mapColAndRowToPosition(col, row)
          expect(position).to.equal('1:2')
        })
      })
      
      describe('prepareInfoBoxes', () => {
        test('should sort and distribute infoBoxes', () => {
          const boxes = [
            {id: 1, position: '0:0'},
            {id: 2, position: '1:0'},
            {id: 5, position: '1:2'},
            {id: 4, position: '1:1'},
            {id: 7, position: '2:1'},
            {id: 3, position: '0:0'},
            {id: 6, position: '2:0'}
          ]

          const expectedOrder = [2, 4, 5, 3, 6, 7, 1]

          const sortedBoxes = prepareInfoBoxes(boxes)

          expect(sortedBoxes.map(b => b.id)).to.deep.equal(expectedOrder)
        })

        test('should map `position` to `col` and `row`', () => {
          const boxes = [
            {id: 1, position: '0:0'},
            {id: 2, position: '1:0'},
            {id: 3, position: '1:1'},
            {id: 4, position: '1:2'}
          ]

          const expectedBoxes = [
            {id: 2, position: '1:0', col: 0, row: 0},
            {id: 3, position: '1:1', col: 0, row: 1},
            {id: 4, position: '1:2', col: 0, row: 2},
            {id: 1, position: '0:0', col: 1, row: 0}
          ]

          const infoBoxes = prepareInfoBoxes(boxes)

          expect(infoBoxes).to.deep.equal(expectedBoxes)
        })

        test('should distribute infoBoxes on empty columns', () => {
          const boxes = [
            {id: 1, position: '0:0'},
            {id: 2, position: '0:0'}
          ]

          const expectedBoxes = [
            {id: 1, position: '0:0', col: 0, row: 0},
            {id: 2, position: '0:0', col: 1, row: 0}
          ]

          const sortedBoxes = prepareInfoBoxes(boxes)

          expect(sortedBoxes).to.deep.equal(expectedBoxes)
        })
      })
    })
  })
})
