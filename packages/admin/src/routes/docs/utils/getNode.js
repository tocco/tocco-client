const DOC_PATH_REGEX = /^\/docs\/doc\/(\d+)\/detail$/
const PARENT_PATH_REGEX = /^\/docs\/(domain|folder)\/(\d+)\/list$/

const getResourceNode = pathname => {
  const docMatches = DOC_PATH_REGEX.exec(pathname)
  return docMatches && docMatches.length >= 2 ? {
    model: 'Resource',
    key: docMatches[1]
  } : null
}

const getParentNode = pathname => {
  const parentMatches = PARENT_PATH_REGEX.exec(pathname)
  if (parentMatches && parentMatches.length >= 3) {
    const model = parentMatches[1].charAt(0).toUpperCase() + parentMatches[1].slice(1)
    const key = parentMatches[2]
    return {
      model,
      key
    }
  }
  return null
}

const getNode = pathname => getResourceNode(pathname) || getParentNode(pathname)

export default getNode
