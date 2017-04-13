export const atMostOne = array => {
  if (!array || array.length === 0) {
    return null
  } else if (array.length === 1) {
    return array[0]
  } else {
    throw new Error('Expected at most one item in array: ' + array.join(', '))
  }
}
