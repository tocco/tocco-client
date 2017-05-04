export const getSearchInputsForRequest = (searchInputs, entityModel) => {
  const result = {}
  Object.keys(searchInputs).forEach(f => {
    if (entityModel[f] && entityModel[f].type === 'relation') {
      if (entityModel[f].multi) {
        result[`${f}.pk`] = searchInputs[f].map(o => o.key)
      } else {
        result[`${f}.pk`] = searchInputs[f].key
      }
    } else {
      result[f] = searchInputs[f]
    }
  })

  return result
}
