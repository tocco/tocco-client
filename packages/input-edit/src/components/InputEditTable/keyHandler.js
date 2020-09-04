export const arrowKeyHandler = event => {
  if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)
    && ['ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowUp'].includes(event.key)) {
    event.preventDefault()
    const [rowIndex, columnIndex] = document.activeElement.id.split(':')
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      const currentIndex = Number.parseInt(rowIndex)
      const indexDiff = event.key === 'ArrowUp' ? -1 : 1
      const idToFocus = `${currentIndex + indexDiff}:${columnIndex}`
      const elementToFocus = document.getElementById(idToFocus)
      focusElement(elementToFocus)
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      const currentIndex = Number.parseInt(columnIndex)
      const indexDiff = event.key === 'ArrowLeft' ? -1 : 1
      const elementToFocus = findHorizontalElementToFocus(rowIndex, currentIndex, indexDiff)
      focusElement(elementToFocus)
    }
  }
}

/**
 * there might be readonly fields mixed in, so we need to check the rest of the fields
 * @param rowIndex which row to navigate in
 * @param currentIndex last checked cell index
 * @param indexDiff which direction to move in
 * @returns {HTMLElement}
 */
const findHorizontalElementToFocus = (rowIndex, currentIndex, indexDiff) => {
  const adjustedIndex = currentIndex + indexDiff
  const idToFocus = `${rowIndex}:${adjustedIndex}`
  const elementToFocus = document.getElementById(idToFocus)
  if (elementToFocus) {
    if (['INPUT', 'TEXTAREA'].includes(elementToFocus.tagName) && !elementToFocus.disabled) {
      return elementToFocus
    } else {
      return findHorizontalElementToFocus(rowIndex, adjustedIndex, indexDiff)
    }
  } else {
    return elementToFocus
  }
}

const focusElement = elementToFocus => {
  if (elementToFocus) {
    // Reacts NumberFormat is clingy and steals focus when using left and right arrow keys, so we steal it back
    setTimeout(() => {
      elementToFocus.focus()
    }, 0)
  }
}
