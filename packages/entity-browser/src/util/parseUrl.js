const isId = part => !isNaN(part)

const parseUrl = url => {
  const parts = url.split('/').filter(part => !!part)
  const lastPart = parts[parts.length - 1]
  const modelPaths = parts.filter((el, idx) => idx > 1 && idx % 2 === 0)

  if (isId(lastPart)) {
    const entityId = parts[parts.length - 1]
    const parentUrl = '/' + parts.slice(0, -2).join('/')

    return {modelPaths, entityId, parentUrl}
  } else {
    const entityId = undefined
    const parentUrl = '/' + parts.slice(0, -1).join('/')

    return {modelPaths, entityId, parentUrl}
  }
}

export default parseUrl
