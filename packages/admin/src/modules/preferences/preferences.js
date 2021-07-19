const transform = value => {
  switch (value) {
    case 'true':
      return true
    case 'false':
      return false
    default:
      return value
  }
}

export const transformValues = preferences =>
  Object.entries(preferences).reduce((acc, [key, value]) => (
    {
      ...acc,
      [key]: transform(value)
    }
  ), {})
