
/**
 * Maps posititon string to col and row object with both 0-based index
 *
 * @param position {String}: has the format "row:column" with column 1-based and row 0-based index
 */
export const mapPositionToColAndRow = position => {
  const split = position.split(':')
  const row = parseInt(split[0], 10)
  const col = parseInt(split[1], 10) - 1
  return {col, row}
}

/**
 * Maps row and col to posititon string with format "row:column"
 *
 * @param row {number}
 * @param col {number}
 */
export const mapColAndRowToPosition = (row, col) => `${row}:${col + 1}`
