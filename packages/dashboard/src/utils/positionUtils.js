
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
