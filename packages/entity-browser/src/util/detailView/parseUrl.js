const parseUrl = url => {
  const parts = url.split('/').filter(part => !!part)

  const modelPaths = []

  for (let i = 2; i < parts.length - 1; i += 2) {
    modelPaths.push(parts[i])
  }

  const entityId = parts[parts.length - 1]
  const parentUrl = '/' + parts.slice(0, -2).join('/')

  return {modelPaths, entityId, parentUrl}
}

export default parseUrl
