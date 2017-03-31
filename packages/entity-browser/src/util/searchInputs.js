export const getSearchInputsForRequest = (searchInputs, entityModel) => {
  const result = {}
  Object.keys(searchInputs).forEach(f => {
    if (entityModel[f] && entityModel[f].type === 'relation') {
      result[`${f}.pk`] = searchInputs[f]
    } else {
      result[f] = searchInputs[f]
    }
  })

  return result
}
