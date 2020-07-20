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
    .reduce((acc, c, idx) => ({
      ...acc,
      [c.id]: idx
    }), {})

export const changePosition = (positions, field, fieldAfterPosition) =>
  Object.keys(positions)
    .sort((a, b) => positions[a] - positions[b])
    .filter(key => key !== field)
    .reduce((acc, key) => [
      ...acc,
      key,
      ...(key === fieldAfterPosition ? [field] : [])
    ]
    , [])
    .reduce((acc, key, idx) => ({
      ...acc,
      [key]: idx
    })
    , {})

export const getPositionsPreferencesToSave = (formName, positions) =>
  Object.keys(positions)
    .reduce((acc, key) => ({
      ...acc,
      [`${formName}.${key}.position`]: positions[key].toString()
    }), {})
