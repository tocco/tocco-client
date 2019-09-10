export const getOrFirst = value => {
  if (value && Array.isArray(value)) {
    if (value.length > 0) {
      return value[0]
    }
    return []
  }
  return value
}
