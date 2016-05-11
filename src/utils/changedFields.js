export default function getChangedFields(oldFields, newFields) {
  const changedFields = {}

  Object.keys(newFields).forEach(key => {
    if (oldFields[key] && newFields[key] !== oldFields[key].value) {
      changedFields[key] = newFields[key]
    }
  })

  return changedFields
}
