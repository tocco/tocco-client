const showBackButton = (initialKey, modelPaths) => {
  if (modelPaths.length === 0) {
    return (!initialKey || isNaN(initialKey))
  }
  return true
}

export default showBackButton
