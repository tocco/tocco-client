import _get from 'lodash/get'

const loadColumnValue = (nodes, column) => {
  return loadPathValue(nodes, column.children[0].path)
}

const loadPathValue = (nodes, path) => {
  const pathElements = path.split('.')
  return resolvePath(nodes, pathElements)
}

const resolvePath = (current, pathElements) => {
  if (current && pathElements.length > 0) {
    const steppedDownPath = pathElements.splice(1)
    const path = pathElements[0] + '.value'
    const next = _get(current, path)
    if (Array.isArray(next)) {
      return next.map(element => resolvePath(element.paths, steppedDownPath)).join(', ')
    } else if (next && Object.prototype.hasOwnProperty.call(next, 'paths')) {
      return resolvePath(next.paths, steppedDownPath)
    } else {
      return next
    }
  } else {
    return current
  }
}

export default loadColumnValue
export {loadPathValue}
