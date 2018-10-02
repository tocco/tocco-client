import {requestSaga} from './rest'

import {call} from 'redux-saga/effects'

/**
 * Helper to fetch entities.
 *
 * @param entityName {String} Name of the entity
 * @param options {Object} An object which can contain the following options:
 * - page {Number} Current page, needed to calculate offset. Default is undefined which means no offset.
 * - limit {Object} Maximum amount of entities to be retrieved
 * - orderBy {Array} Array of objects containing a field and order String. e.g. [{field: 'firstname', order: 'asc'}]
 * - paths {Array} Paths that should be returned
 * - fields {Array} Fields that should be returned
 * - relations {String} Relations that should be returned
 * - searchFilters {Array} List of filter names to be applied
 * - searchInputs {Object} Object that can contain search field values and fulltext _search attribute
 * - formName {String} Name of the form, needed to resolve display expressions and such
 * - query {String} TQL query
 * @param transformer {function} Function to directly manipulate the result. By default returns data attribute
 */
export function* fetchEntities(entityName, options, transformer = defaultEntityTransformer) {
  const queryParams = yield call(buildParams, options)
  const resp = yield call(requestSaga, `entities/${entityName}`, {queryParams})
  return yield call(transformer, resp.body)
}

/**
 * Helper to fetch forms.
 * @param formName {String} Name of the requested form
 * @param transformer {function} Function to directly manipulate the result. By default the form gets returned.
 */
export function* fetchForm(formName, transformer = defaultFormTransformer) {
  const response = yield call(requestSaga, `forms/${formName}`)
  return yield call(transformer, response.body)
}

/**
 * Helper to fetch models.
 * @param entityName {String} Name of the entity you like to fetch the model
 * @param transformer {function} Function to directly manipulate the result. By default returns a flatten object of
 * fields and relations in one object. Relations get "type": "relation"
 */
export function* fetchModel(entityName, transformer = defaultModelTransformer) {
  const resp = yield call(requestSaga, `entities/${entityName}/model`)
  return yield call(transformer, resp.body)
}

export const defaultModelTransformer = json => {
  const model = {}
  json.fields.forEach(field => {
    model[field.fieldName] = {
      ...field
    }
  })

  json.relations.forEach(relation => {
    model[relation.relationName] = {
      type: 'relation',
      ...relation
    }
  })
  return model
}

export const defaultFormTransformer = json => (json.form)

export const defaultEntityTransformer = json => (json.data)

export function buildParams({
  page = undefined,
  orderBy = {},
  limit = undefined,
  paths = [],
  fields = undefined,
  relations = undefined,
  searchFilters = [],
  searchInputs = {},
  formName = undefined,
  query = undefined
} = {}) {
  const params = {
    '_sort': Object.keys(orderBy || {}).length === 2 ? `${orderBy.name} ${orderBy.direction}` : undefined,
    '_paths': paths.join(','),
    '_fields': fields && fields.length === 0 ? '!' : fields ? fields.join(',') : null,
    '_relations': relations && relations.length === 0 ? '!' : relations ? relations.join(',') : null,
    '_form': formName,
    '_filter': searchFilters.join(','),
    '_where': query,
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
