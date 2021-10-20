import {NUMBER_OF_COLUMNS} from './constants'
import {sortInfoBoxes} from './dashboardUtils'

/**
 * Maps posititon string to col and row object with both 0-based index
 *
 * @param position {String}: has the format "column:row" with column 1-based and row 0-based index
 */
export const mapPositionToColAndRow = position => {
  const split = position.split(':')
  const col = parseInt(split[0], 10) - 1
  const row = parseInt(split[1], 10)
  return {col: Math.max(0, col), row}
}

/**
 * Maps row and col to posititon string with format "column:row"
 *
 * @param row {number}
 * @param col {number}
 */
export const mapColAndRowToPosition = (col, row) => `${col + 1}:${row}`

const isUnpositionedInfoBox = box => box.position === null || box.position === '0:0'

const getColumnWithMinAmountOfInfoBoxes = infoBoxes => {
  const columns = [...Array(NUMBER_OF_COLUMNS).keys()]

  const numberOfBoxesPerCol = columns.reduce((acc, col) => ({
    ...acc,
    [col]: infoBoxes.filter(b => b.col === col).length
  }), {})

  const minCol = Object.keys(numberOfBoxesPerCol).reduce(
    (min, key) => {
      const col = parseInt(key, 10)
      return numberOfBoxesPerCol[col] < min.numberOfBoxes ? {col, numberOfBoxes: numberOfBoxesPerCol[col]} : min
    },
    {col: -1, numberOfBoxes: Number.MAX_VALUE})
  
  return minCol.col === -1 ? {col: 0, numberOfBoxes: 0} : minCol
}

const distributeInfoBoxes = infoBoxes => {
  const unpositionedInfoBoxes = infoBoxes.filter(isUnpositionedInfoBox)
  const positionedInfoBoxes = infoBoxes.filter(box => !isUnpositionedInfoBox(box))
  return unpositionedInfoBoxes
    .reduce((acc, box) => {
      const needsNewPosition = box.position === null || box.position === '0:0'
      const {col, numberOfBoxes} = getColumnWithMinAmountOfInfoBoxes(acc)
      return [
        ...acc,
        needsNewPosition ? {...box, col, row: numberOfBoxes} : box
      ]
    }, positionedInfoBoxes)
}

/**
 * Sorts and distributes infoBoxes from the backend response to be usable in the client.
 * @param infoBoxes
 * @returns sorted infoBoxes with `col` and `row` fields
 */
export const prepareInfoBoxes = infoBoxes => sortInfoBoxes(distributeInfoBoxes(infoBoxes
  .map(box => ({...box, ...mapPositionToColAndRow(box.position)}))))
