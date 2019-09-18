import _reduce from 'lodash/reduce'
import _isObject from 'lodash/isObject'
import {call} from 'redux-saga/effects'

import {requestSaga} from './rest'

/**
 * Helper to fetch a single entity
 *
 * @param entityName {String} Name of the entity
 * @param key {String} key of the entity
 * @param query {Object} see 'buildRequestQuery' function
 * @param transformer {function} Function to directly manipulate the result. By default returns data attribute
 */
export function* fetchEntity(entityName, key, query, transformer = json => json) {
  const requestQuery = yield call(buildRequestQuery, query)
  const options = {
    method: 'GET',
    queryParams: requestQueryToUrlParams(requestQuery)
  }

  const resp = yield call(requestSaga, `entities/${entityName}/${key}`, options)
  return yield call(transformer, resp.body)
}

/**
 * Helper to fetch the default-display of an entity
 *
 * @param entityName {String} Name of the entity
 * @param key {String} key of the entity
 */
export function* fetchDisplay(entityName, key) {
  const options = {
    method: 'GET'
  }

  const resp = yield call(requestSaga, `entity/${entityName}/${key}/display`, options)
  return resp.body.display
}

/**
 * Fetch amount of entities
 *
 * @param entityName {String} Name of the entity
 * @param query {Object} see 'buildRequestQuery' function
 * @param requestOptions {Object} An object which can contain the following options:
 * - method {String} HTTP Method of request. Default is POST
 * - endpoint {String} To overwrite default endpoint entities/{entityName}/count
 */
export function* fetchEntityCount(
  entityName,
  query,
  {
    method = 'POST',
    endpoint
  } = {}
) {
  const requestQuery = yield call(buildRequestQuery, query)
  const resource = (endpoint || `entities/${entityName}`) + '/count'

  const options = {
    method,
    ...(method === 'GET' ? {queryParams: requestQueryToUrlParams(requestQuery)} : {body: requestQuery})
  }

  const response = yield call(requestSaga, resource, options)
  return response.body.count
}

/**
 * Helper to fetch entities.
 *
 * @param entityName {String} Name of the entity
 * @param query {Object} see 'buildRequestQuery' function
 * @param requestOptions {Object} An object which can contain the following options:
 * - method {String} HTTP Method of request. Default is POST
 * - endpoint {String} To overwrite default endpoint entities/{entityName}/search
 * @param transformer {function} Function to directly manipulate the result. By default returns data attribute
 */
export function* fetchEntities(
  entityName,
  query,
  {
    method = 'POST',
    endpoint
  } = {},
  transformer = defaultEntityTransformer
) {
  const requestQuery = yield call(buildRequestQuery, query)
  const resource = endpoint || `entities/${entityName}${method === 'POST' ? '/search' : ''}`

  const options = {
    method,
    ...(method === 'GET' ? {queryParams: requestQueryToUrlParams(requestQuery)} : {body: requestQuery})
  }

  const resp = yield call(requestSaga, resource, options)
  return yield call(transformer, resp.body)
}

/**
 * Helper to fetch forms.
 * @param formName {String} Name of the requested form
 */
export function* fetchForm(formName) {
  const response = yield call(requestSaga, `forms/${formName}`)
  return yield call(defaultFormTransformer, response.body)
}

/**
 * Helper to fetch models.
 * @param entityName {String} Name of the entity you like to fetch the model
 */
export function* fetchModel(entityName) {
  const resp = yield call(requestSaga, `entities/${entityName}/model`)
  return yield call(defaultModelTransformer, resp.body)
}

export const defaultModelTransformer = json => {
  const model = {
    name: json.name,
    label: json.label,
    paths: {}
  }
  json.fields.forEach(field => {
    model.paths[field.fieldName] = {
      ...field
    }
  })

  json.relations.forEach(relation => {
    model.paths[relation.relationName] = {
      type: 'relation',
      ...relation
    }
  })
  return model
}

export const defaultFormTransformer = json => (json.form)

export const defaultEntityTransformer = json => (json.data)

const isValidSorting = sorting =>
  Array.isArray(sorting) && sorting.length >= 1 && sorting[0].field && sorting[0].order

/**
 * Function that converts a query object into request query object that can be attached to a request.
 * Some options get converted or calculated and other removed if there are undefined.
 *
 * @param options {Object} An object which can contain the following options:
 * - conditions {Object} Object that can contain search fields. Each field
 * - fields {Array} Fields that should be returned
 * - form {String} Name of the form, needed to resolve display expressions and such
 * - limit {Object} Maximum amount of entities to be retrieved
 * - search {Object} Fulltext search on entity
 * - sorting {Array} Array of objects containing a field and order String. e.g. [{field: 'firstname', order: 'asc'}]
 * - page {Number} Current page, needed to calculate offset. Default is undefined which means no offset.
 * - paths {Array} Paths that should be returned
 * - tql {String} TQL query
 * - relations {String} Relations that should be returned
 * - filters {Array} List of filter names to be applied
 */
export const buildRequestQuery = ({
  conditions,
  fields,
  form,
  limit,
  search,
  sorting,
  page,
  paths,
  tql,
  relations,
  filter
} = {}) => (
  {
    ...(conditions ? {conditions} : {}),
    ...(Array.isArray(fields) ? {fields: fields.length === 0 ? '!' : fields} : {}),
    ...(form ? {form} : {}),
    ...(limit ? {limit} : {}),
    ...(search ? {search} : {}),
    ...(isValidSorting(sorting) ? {sort: `${sorting[0].field} ${sorting[0].order}`} : {}),
    ...(page && limit ? {offset: (page - 1) * limit} : {}),
    ...(paths ? {paths} : {}),
    ...(tql ? {where: tql} : {}),
    ...(Array.isArray(relations) ? {relations: relations.length === 0 ? '!' : relations} : {}),
    ...(filter ? {filter} : {})
  }
)

export const requestQueryToUrlParams = queryObject =>
  _reduce(queryObject, (result, value, key) => {
    let add = {}
    if (key === 'conditions') {
      add = flattenObjectValues(value)
    } else {
      add['_' + key] = Array.isArray(value) ? value.join(',') : value
    }

    return {
      ...result,
      ...add
    }
  }, {})

export const flattenObjectValues = value =>
  _reduce(value, (result, value, key) => ({
    ...result,
    [key]: _isObject(value) && value.value ? value.value : value
  }), {})
