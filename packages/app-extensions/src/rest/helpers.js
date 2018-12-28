import _reduce from 'lodash/reduce'

import {requestSaga} from './rest'

import {call} from 'redux-saga/effects'

/**
 * Helper to fetch a single entity
 *
 * @param entityName {String} Name of the entity
 * @param key {String} key of the entity
 * @param options {Object} An object which can contain the following options:
 * - paths {Array} Paths that should be returned
 * - fields {Array} Fields that should be returned
 * - relations {String} Relations that should be returned
 * - formName {String} Name of the form, needed to resolve display expressions and such
 * @param transformer {function} Function to directly manipulate the result. By default returns data attribute
 */
export function* fetchEntity(entityName, key, options, transformer = json => json) {
  const queryParams = yield call(buildEntityQueryObject, options)
  const resp = yield call(requestSaga, `entities/${entityName}/${key}`, {queryParams})
  return yield call(transformer, resp.body)
}

/**
 * Fetch amount of entities
 *
 * @param entityName {String} Name of the entity
 * @param options {Object} see 'buildEntityQueryObject' function
 * @param endpoint {String} To overwrite default endpoint entities/entityName/search
 */
export function* fetchEntityCount(entityName, options, endpoint, method = 'POST') {
  const params = buildEntityQueryObject(options)
  const resource = (endpoint || `entities/${entityName}`) + '/count'

  const requestOptions = {
    method,
    ...(method === 'GET' ? {queryParams: queryObjectToUrlParams(params)} : {body: params})
  }

  const response = yield call(requestSaga, resource, requestOptions)
  return response.body.count
}

/**
 * Helper to fetch entities.
 *
 * @param entityName {String} Name of the entity
 * @param options {Object} see 'buildEntityQueryObject' function
 * @param transformer {function} Function to directly manipulate the result. By default returns data attribute
 * @param endpoint {String} To overwrite default endpoint entities/entityName/search
 * @param method {String} To overwrite default http method 'POST'
 */
export function* fetchEntities(entityName, options, transformer = defaultEntityTransformer, endpoint, method = 'POST') {
  const params = yield call(buildEntityQueryObject, options)
  const resource = endpoint || `entities/${entityName}${method === 'POST' ? '/search' : ''}`

  const requestOptions = {
    method,
    ...(method === 'GET' ? {queryParams: queryObjectToUrlParams(params)} : {body: params})
  }

  const resp = yield call(requestSaga, resource, requestOptions)
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

const isValidSorting = sorting =>
  Array.isArray(sorting) && sorting.length >= 1 && sorting[0].field && sorting[0].order

/**
 * Function that converts options in a certain format into query object that gets attached to any request.
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
 * - query {String} TQL query
 * - relations {String} Relations that should be returned
 * - filters {Array} List of filter names to be applied
 */
export const buildEntityQueryObject = ({
  conditions,
  fields,
  form,
  limit,
  search,
  sorting,
  page,
  paths,
  query,
  relations,
  filters
} = {}) => (
  {
    ...(conditions ? {conditions} : {}),
    ...(Array.isArray(fields) ? {'fields': fields.length === 0 ? '!' : fields} : {}),
    ...(form ? {form} : {}),
    ...(limit ? {limit} : {}),
    ...(search ? {search} : {}),
    ...(isValidSorting(sorting) ? {'sort': `${sorting[0].field} ${sorting[0].order}`} : {}),
    ...(page && limit ? {'offset': (page - 1) * limit} : {}),
    ...(paths ? {paths} : {}),
    ...(query ? {'where': query} : {}),
    ...(Array.isArray(relations) ? {'relations': relations.length === 0 ? '!' : relations} : {}),
    ...(filters ? {'filter': filters} : {})
  }
)

export const queryObjectToUrlParams = queryObject => (
  _reduce(queryObject, (result, value, key) => {
    let add = {}
    if (key === 'conditions') {
      add = {...value}
    } else {
      add['_' + key] = Array.isArray(value) ? value.join(',') : value
    }

    return {
      ...result,
      ...add
    }
  }, {})
)
