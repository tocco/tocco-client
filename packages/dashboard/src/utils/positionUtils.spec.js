import {mapColAndRowToPosition, mapPositionToColAndRow} from './positionUtils'

describe('dashboard', () => {
  describe('utils', () => {
    describe('positionUtils', () => {
      describe('mapPositionToColAndRow', () => {
        test('should map extract row and column from position string', () => {
          const position = '1:3'
          const {col, row} = mapPositionToColAndRow(position)
          expect(row).to.equal(1)
          expect(col).to.equal(2)
        })
      })

      describe('mapColAndRowToPosition', () => {
        test('should map extract row and column from position string', () => {
          const row = 1
          const col = 2
          const position = mapColAndRowToPosition(row, col)
          expect(position).to.equal('1:3')
        })
      })
    })
  })
})
