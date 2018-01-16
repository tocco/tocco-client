import {requestSaga} from './rest'
import {call} from 'redux-saga/effects'

export const defaultTransformer = json => (json.data)

export function buildParams({
  page = undefined,
  orderBy = {},
  limit = undefined,
  paths = [],
  fields = undefined,
  relations = undefined,
  searchFilters = [],
  searchInputs = {},
  formName = undefined
} = {}) {
  const params = {
    '_sort': Object.keys(orderBy || {}).length === 2 ? `${orderBy.name} ${orderBy.direction}` : undefined,
    '_paths': paths.join(','),
    '_fields': fields && fields.length === 0 ? '!' : fields ? fields.join(',') : null,
    '_relations': relations && relations.length === 0 ? '!' : relations ? relations.join(',') : null,
    '_form': formName,
    '_filter': searchFilters.join(','),
    ...searchInputs
  }

  if (limit) {
    params._limit = limit
    if (page) {
      params._offset = (page - 1) * limit
    }
  }
  return params
}

/**
 * Abstraction to fetch entities.
 *
 * @param entityName {String} Name of the entity
 * @param searchInputs {Object} An object which can contain the following options:
 * - page {Number} Current page, needed to calculate offset. Default is undefined which means no offset.
 * - limit {Object} Maximum amount of entities to be retrieved
 * - orderBy {Array} Array of objects containing a field and order String. e.g. [{field: 'firstname', order: 'asc'}]
 * - paths {Array} Paths that should be returned
 * - fields {Array} Fields that should be returned
 * - relations {String} Relations that should be returned
 * - searchFilters {Array} List of filter names to be applied
 * - searchInputs {Object} Object that can contain search field values and fulltext _search attribute
 * - formName {String} Name of the form, needed to resolve display expressions and such
 */
export function* fetchEntities(entityName, options, transformer = defaultTransformer) {
  const queryParams = yield call(buildParams, options)
  const resp = yield call(requestSaga, `entities/${entityName}`, {queryParams})
  return yield call(transformer, resp.body)
}
