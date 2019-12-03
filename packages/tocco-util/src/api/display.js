import _get from 'lodash/get'
import _set from 'lodash/set'

const alreadyLoaded = (model, key, lazyData) => {
  return !!_get(lazyData, ['defaultDisplays', model, key], '')
}

const alreadyInRequest = (model, key, request) => {
  return _get(request, [model], []).includes(key)
}

export const getDisplayRequest = (entities, relationFields, lazyData) => {
  const request = {}
  entities.forEach(entity => {
    relationFields.forEach(field => {
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
