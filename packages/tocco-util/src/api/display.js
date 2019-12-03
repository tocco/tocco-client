import _get from 'lodash/get'
import _set from 'lodash/set'

const alreadyLoaded = (model, key, lazyData) => {
  return !!_get(lazyData, ['defaultDisplays', model, key], '')
}

const alreadyInRequest = (model, key, request) => {
  return _get(request, [model], []).includes(key)
}

/**
 * Gets a request object to retrieve all the displays of the given paths within the entities.
 *
 * @param {array} entities - List of all entities.
 * @param {object} relationPaths - Field that need a display to be loaded
 * @param {object} lazyData - Optional object with the already loaded  displays to shrink the request.
 */
export const getPathDisplayRequest = (entities, relationPaths, lazyData) => {
  const request = {}
  entities.forEach(entity => {
    relationPaths.forEach(field => {
      if (entity[field]) {
        const fieldValue = entity[field]
        const values = Array.isArray(fieldValue) ? fieldValue : [fieldValue]

        values.forEach(value => {
          const {model, key} = value

          if (!alreadyLoaded(model, key, lazyData) && !alreadyInRequest(model, key, request)) {
            _set(request, [model], [..._get(request, [model], []), key])
          }
        })
      }
    })
  })

  return request
}

/**
 * Gets a request object to retrieve all displays of the entities.
 *
 * @param {array} entities - List of all entities.
 */
export const getDisplayRequest = entities => (
  entities.reduce((acc, val) => ({
    ...acc,
    [val.model]: [...(acc[val.model] || []), val.key]
  }
  ), {})
)
