/**
 * Enforce that all values of a flat object are used as keys in another object.
 * @param  {object} completeMap            A flat object with contains a full list of
 *                                         all allowed keys defined as values.
 * @param  {object} potentialIncompleteMap A flat object which is does not reuse all values as keys.
 * @return {boolean}                       Return true if all values are reused as keys.
 */

const getNotIncludedItems = (complete, incomplete) => {
  const diff = []
  complete.forEach(function(item) {
    if (!incomplete.includes(item)) {
      diff.push(item)
    }
  })
  return diff
}

const assertObjectValuesMatchOtherObjectKeys = (completeMap, potentialIncompleteMap) => {
  const values = Object.values(completeMap).sort()
  const keys = Object.keys(potentialIncompleteMap).sort()
  let diff

  if (values.length > keys.length) {
    diff = getNotIncludedItems(values, keys)
    // eslint-disable-next-line no-console
    console.warn(`${(diff.length > 1) ? 'Keys' : 'Key'} ${diff.join(' and ')} has to be added to incomplete map.`)
    return false
  }

  if (values.length < keys.length) {
    diff = getNotIncludedItems(keys, values)
    // eslint-disable-next-line no-console
    console.warn(`${(diff.length > 1) ? 'Keys' : 'Key'} ${diff.join(' and ')} has to be removed from over-defined map.`)
    return false
  }

  if (!values.every(
    (value, index) => {
      return value === keys[index]
    }
  )) {
    diff = getNotIncludedItems(keys, values)
    // eslint-disable-next-line no-console
    console.warn(`${(diff.length > 1) ? 'Keys' : 'Key'} ${diff.join(' and ')} has to be spelled correctly in map.`)
    return false
  }

  return true
}

export default assertObjectValuesMatchOtherObjectKeys
