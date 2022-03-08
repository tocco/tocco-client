import {route} from 'tocco-util'

const entityUrlRegex = '/e/:entity/:key?/:relation*/:view(list|detail|edit|create|relations|action)/:actionId?'
const actionUrlRegex = '/e/action/:actionId'

/**
 * Returns an object with actionId, entity, key, relation and view for given url
 *
 * @param pathname {String} url / path starting with /e/
 */
export const getPathInfo = pathname => {
  const entityParams = route.extractParamsFromPath(entityUrlRegex, pathname)
  const actionParams = route.extractParamsFromPath(actionUrlRegex, pathname)

  return entityParams || actionParams
}
