const wholeEntityField = '___entity'

export const formValuesToEntity = values => {
  const entity = values[wholeEntityField]

  Object.keys(values).forEach(key => {
    if (key !== wholeEntityField) {
      entity.paths[key].value.value = values[key]
    }
  })

  return entity
}

export const entityToFormValues = entity => {
  if (!entity || !entity.paths) return {}
  const result = {}
  const paths = entity.paths
  Object.keys(entity.paths).forEach(key => {
    if (paths[key].value !== null) {
      result[key] = paths[key].value.value
    }
  })

  result[wholeEntityField] = entity
  return result
}
