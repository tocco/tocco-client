export const getSingleEntitySelection = (entityName, key) => ({
  entityName,
  type: 'ID',
  ids: [key],
  count: 1
})
