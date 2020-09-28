import pathToRegexp from 'path-to-regexp'

const entityUrlRegex = '/e/:entity/:key?/:relation*/:view(list|detail|edit|create|relations|action)/:actionId?'
const actionUrlRegex = '/e/action/:actionId'

/**
 * Returns an object with actionId, entity, key, relation and view for given url
 *
 * @param pathname {String} url / path starting with /e/
 */
export const getPathInfo = pathname => {
  const pathParts = []
  const re = pathToRegexp(entityUrlRegex, pathParts)
  const res = re.exec(pathname)

  if (res !== null) {
    return pathParts.reduce((acc, pathPart, idx) => {
      return {
        ...acc,
        [pathPart.name]: res[idx + 1]
      }
    }, {})
  }

  const actionPathRegex = pathToRegexp(actionUrlRegex, pathParts)
  const parseResult = actionPathRegex.exec(pathname)

  if (parseResult !== null) {
    return {
      actionId: parseResult[1]
    }
  }

  return null
}
