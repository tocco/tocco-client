import _reduce from 'lodash/reduce'
import {api} from 'tocco-util'

export const entitiesListTransformer = json => {
  const result = json.data.map(entity => (
    {
      __key: entity.key,
      __model: entity.model,
      ...(flattenPath({value: entity}))
    }
  ))

  return result
}

const flattenPath = (pathObj, currentPath = [], entity) => {
  if (Array.isArray(pathObj.value)) {
    return pathObj.value.reduce((acc2, value) => {
      const flatten = flattenPath({...pathObj, value}, currentPath, pathObj)
      const a = _reduce(flatten, (acc, val, key) => ({...acc, [key]: [...(acc2[key] || []), val]}), {})
      return {...acc2, ...a}
    }, {})
  }

  let def = {}

  if (pathObj.value !== null) {
    if (currentPath.length > 0 && pathObj.value && pathObj.value.key && pathObj.value.model) {
      def = {[currentPath.join('.')]: {model: pathObj.value.model, key: pathObj.value.key}}
    }

    if (pathObj.value.paths) {
      return _reduce(
        pathObj.value.paths,
        (acc, pathObjInner, key) => {
          const flatten = flattenPath(pathObjInner, [...currentPath, key], pathObj.value)

          return {...acc, ...flatten}
        },
        {...def}
      )
    } else {
      return {[currentPath.join('.')]: api.typeValueExtractor.field(pathObj, entity)}
    }
  }
}
