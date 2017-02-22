export const getSearchInputsForRequest = (searchInputs, searchForm) => {
  const result = {}
  Object.keys(searchInputs).forEach(f => {
    if (searchForm.entityModel[f] && searchForm.entityModel[f].type === 'relation') {
      result[`${f}.pk`] = searchInputs[f]
    } else {
      result[f] = searchInputs[f]
    }
  })

  return result
}

