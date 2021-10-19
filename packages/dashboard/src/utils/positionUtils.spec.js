import {mapColAndRowToPosition, mapPositionToColAndRow} from './positionUtils'

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
    })
  })
})
