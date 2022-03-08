const measureSize = (lastPosition, currentPosition, currentSize) => {
  const diff = currentPosition - lastPosition
  return Math.max(50, currentSize + diff)
}

export default measureSize
