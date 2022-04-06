import _get from 'lodash/get'
import _isEqual from 'lodash/isEqual'
import _isObject from 'lodash/isObject'
import _pick from 'lodash/pick'
import _reduce from 'lodash/reduce'
import _set from 'lodash/set'
import _uniqWith from 'lodash/uniqWith'

export const metaFields = {
  KEY: '__key',
  MODEL: '__model',
  VERSION: '__version'
}

export const relationFieldTypes = ['single-select-box', 'multi-select-box', 'single-remote-field', 'multi-remote-field']
export const relevantRelationAttributes = ['key', 'display', 'model', 'version']

const typeValueExtractor = (type, value) => {
  switch (type) {
    case 'entity':
      return value ? _pick(value, relevantRelationAttributes) : null
    case 'entity-list':
      return value.length > 0 ? value.map(childValue => _pick(childValue, relevantRelationAttributes)) : null
    case 'login':
      return _get(value, 'username')
    case 'longitude':
    case 'latitude':
      return _get(value, 'value')
    default:
      return value
  }
}

/**
 * Transforms a entity object into a flatten structure wil only one hierarchy of properties.
 * @param {object} entity - Entity as retrieved by the rest endpoint.
 */
export const getFlattenEntity = entity => ({
  [metaFields.KEY]: entity.key,
  [metaFields.MODEL]: entity.model,
  [metaFields.VERSION]: entity.version,
  ...flattenPaths(entity.paths)
})

const mergeChildFlatten = (flatten, childFlatten) =>
  _reduce(
    childFlatten,
    (acc, val, key) => {
      const value = (Array.isArray(val) ? val : [val]).filter(v => v !== null)
      return {
        ...acc,
        [key]: _uniqWith([...(acc[key] || []), ...value], _isEqual)
      }
    },
    flatten
  )

export const flattenPaths = (paths, prevPathKeys = []) =>
  _reduce(
    paths,
    (accFlatten, path, pathKey) => {
      const currentPathKeys = [...prevPathKeys, pathKey]

      let childrenFlatten = {}
      if (path.value) {
        if (Array.isArray(path.value)) {
          childrenFlatten = path.value.reduce((accChildrenFlatten, v) => {
            const childFlatten = flattenPaths(v.paths, currentPathKeys)
            return mergeChildFlatten(accChildrenFlatten, childFlatten)
          }, {})
        } else {
          childrenFlatten = flattenPaths(path.value.paths, currentPathKeys)
        }
      }

      const currentFlatten = {
        [currentPathKeys.join('.')]: typeValueExtractor(path.type, path.value)
      }

      return {
        ...accFlatten,
        ...currentFlatten,
        ...childrenFlatten
      }
    },
    {}
  )

/**
 * Transforms a flatten entity back to a api compatible entity object. Only regards fields that are marked as dirty.
 * @param {object} flattenEntity - Entity that was prior transformed with 'getFlattenEntity'
 */
export const toEntity = flattenEntity => {
  const ignoredPath = path => Object.values(metaFields).includes(path)

  const valueSimplifier = value => {
    if (Array.isArray(value)) {
      return value.map(v => valueSimplifier(v))
    }

    // id and resourceKey are only used for documents
    return _isObject(value) ? _pick(value, ['key', 'version', 'id', 'resourceKey']) : value
  }

  const paths = Object.keys(flattenEntity).reduce((acc, path) => {
    if (!ignoredPath(path)) {
      const t = path.split('.').join('.paths.')
      return _set(acc, t, valueSimplifier(flattenEntity[path]))
    }
    return acc
  }, {})

  return {
    model: flattenEntity[metaFields.MODEL],
    key: flattenEntity[metaFields.KEY],
    version: flattenEntity[metaFields.VERSION],
    paths
  }
}
