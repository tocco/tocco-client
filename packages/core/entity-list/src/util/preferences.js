export const getPositions = preferences =>
  Object.keys(preferences)
    .filter(key => key.endsWith('.position'))
    .reduce((acc, key) => {
      const fieldName = key.match(/.*\.([^.]+)\.position$/)
      return {
        ...acc,
        [fieldName[1]]: Number(preferences[key])
      }
    }, {})

export const getPositionsFromColumns = columns =>
  columns
    .filter(c => !c.fixedPosition)
    .reduce(
      (acc, c, idx) => ({
        ...acc,
        [c.id]: idx
      }),
      {}
    )

export const changePosition = (positions, field, fieldAfterPosition) =>
  Object.keys(positions)
    .sort((a, b) => positions[a] - positions[b])
    .filter(key => key !== field)
    .reduce((acc, key) => [...acc, key, ...(key === fieldAfterPosition ? [field] : [])], [])
    .reduce(
      (acc, key, idx) => ({
        ...acc,
        [key]: idx
      }),
      {}
    )

export const getPositionsPreferencesToSave = (formName, positions) =>
  Object.keys(positions).reduce(
    (acc, key) => ({
      ...acc,
      [`${formName}.${key}.position`]: positions[key].toString()
    }),
    {}
  )

export const getSorting = preferences => {
  const keyRegex = /^.*\.sorting(Field|Direction)\.?([1-9]*)$/
  return Object.entries(preferences)
    .filter(([key]) => keyRegex.test(key))
    .map(([key, value]) => [transformSortingKey(key.match(keyRegex)), value])
    .reduce((acc, [key, value]) => {
      acc[key.index] = {
        ...acc[key.index],
        [key.field]: value
      }
      return acc
    }, [])
}

const transformSortingKey = keyMatch => ({
  field: transformSortingField(keyMatch[1]),
  index: keyMatch[2] ? parseInt(keyMatch[2]) : 0
})

const transformSortingField = field => (field === 'Direction' ? 'order' : field.toLowerCase())

export const getSortingPreferencesToSave = (formName, sorting) => ({
  [`${formName}.sortingField`]: sorting.field,
  [`${formName}.sortingDirection`]: sorting.order
})

export const getAdditionalSortingPreferencesToSave = (formName, sorting, index) => ({
  [`${formName}.sortingField.${index}`]: sorting.field,
  [`${formName}.sortingDirection.${index}`]: sorting.order
})

export const getColumns = preferences => {
  const keyRegex = /^[^.]+\.(.+)\.hidden$/
  return Object.entries(preferences)
    .filter(([key]) => keyRegex.test(key))
    .reduce((acc, [key, value]) => {
      const fieldName = key.match(keyRegex)[1]
      return {
        ...acc,
        // old preferences marked hidden columns as true, now we mark visible columns as true
        [fieldName]: value === 'false'
      }
    }, {})
}

export const getColumnPreferencesToSave = (formName, columns) =>
  Object.keys(columns).reduce(
    (acc, key) => ({
      ...acc,
      // old preferences marked hidden columns as true, now we mark visible columns as true
      [`${formName}.${key}.hidden`]: (!columns[key]).toString()
    }),
    {}
  )
