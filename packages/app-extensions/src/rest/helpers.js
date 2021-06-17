import _reduce from 'lodash/reduce'
import _isObject from 'lodash/isObject'
import {call} from 'redux-saga/effects'
import {cache} from 'tocco-util'
import _get from 'lodash/get'

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
    queryParams: {
      ...requestQueryToUrlParams(requestQuery),
      _permissions: true,
      _omitLinks: true
    }
  }

  const resp = yield call(requestSaga, `entities/2.0/${entityName}/${key}`, options)
  return yield call(transformer, resp.body)
}

/**
 * Helper to fetch the default-display of an entity
 *
 * @param entityName {String} Name of the entity
 * @param key {String} key of the entity
 * @param type {String} type of the display, default display if none passed
 */
export function* fetchDisplay(entityName, key, type) {
  return _get(yield fetchDisplays({[entityName]: [key]}, type), `${entityName}.${key}`, null)
}

/**
 * Helper to fetch display-expressions of a form for a list of entities
 *
 * @param formName {String} Name of the form
 * @param scope {String} Requested form scope e.g. update or list
 * @param entityKeys {Array} List of entity keys
 * @param displayExpressionFields {Array} List of desired display-expression fields
 */
export function* fetchDisplayExpressions(formName, scope, entityKeys, displayExpressionFields, entityName) {
  const options = {
    method: 'POST',
    queryParams: {
      _paths: displayExpressionFields.join(',')
    },
    body: {
      entityName: entityName,
      type: 'ID',
      ids: entityKeys
    }
  }

  const response = yield call(requestSaga, `forms/${formName}_${scope}/display-expressions`, options)

  return response.body.displayExpressions.reduce((acc, val) => ({...acc, [val.key]: val.displayExpressions}), {})
}

/**
 * Helper to fetch the default-display of an entities.
 *
 * @param request {Object} Object containing model and keys of desired entities e.g. {User: ["123"], Gender: ["1", "2"]}
 * @param type {String} type of the display, default display if none passed
 */
export function* fetchDisplays(request, type) {
  const currentDisplays = Object.entries(request).map(([model, keys]) => ({
    model,
    keys: keys.filter(key => cache.getShortTerm('display', `${model}.${key}${type ? `.${type}` : ''}`) === undefined),
    displays: keys
      .map(key => ({key, display: cache.getShortTerm('display', `${model}.${key}${type ? `.${type}` : ''}`)}))
      .filter(value => value.display !== undefined)
  }))

  const loadedDisplays = yield loadDisplays(currentDisplays, type)

  return currentDisplays.reduce((acc, {model, displays}) => ({
    ...acc,
    [model]: {
      ...acc[model],
      ...(displays.reduce((acc, {key, display}) => ({
        ...acc,
        [key]: display
      }), {}))
    }
  }), loadedDisplays)
}

function* loadDisplays(currentDisplays, type) {
  const keysToLoad = currentDisplays.filter(({keys}) => keys.length > 0).map(({model, keys}) => ({model, keys}))
  if (keysToLoad.length > 0) {
    const options = {
      method: 'POST',
      body: {data: keysToLoad}
    }
    const response = yield call(requestSaga, `entities/2.0/displays${type ? `/${type}` : ''}`, options)

    const loadedDisplays = response.body.data.reduce((acc, value) => (
      {
        ...acc,
        [value.model]: value.values.reduce((acc, value) => ({...acc, [value.key]: value.display}), {})
      }
    ), {})
    Object.entries(loadedDisplays).forEach(([entityName, values]) => {
      Object.entries(values).forEach(([key, display]) => {
        cache.addShortTerm('display', `${entityName}.${key}${type ? `.${type}` : ''}`, display)
      })
    })
    return loadedDisplays
  } else {
    return {}
  }
}

/**
 * Fetch amount of entities
 *
 * @param entityName {String} Name of the entity
 * @param query {Object} see 'buildRequestQuery' function
 * @param requestOptions {Object} An object which can contain the following options:
 * - method {String} HTTP Method of request. Default is POST
 * - endpoint {String} To overwrite default endpoint entities/2.0/{entityName}/count
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
  const resource = (endpoint || `entities/2.0/${entityName}`) + '/count'

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
 * - endpoint {String} To overwrite default endpoint entities/2.0/{entityName}/search
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
  const resource = endpoint || `entities/2.0/${entityName}${method === 'POST' ? '/search' : ''}`

  const options = {
    method,
    queryParams: {
      _omitLinks: true,
      ...(method === 'GET' && requestQueryToUrlParams(requestQuery))
    },
    ...(method === 'POST' && {body: requestQuery})
  }

  const resp = yield call(requestSaga, resource, options)
  return yield call(transformer, resp.body)
}

/**
 * Helper to fetch forms.
 * @param formName {String} Name of the requested form
 * @param scope {String} Requested form scope e.g. update or list
 * @param allowNotFound {Boolean} If true and the form does not exist null is returned.
 *                                Otherwise an exception will be thrown.
 */
export const formCache = {}
export function* fetchForm(formName, scope, allowNotFound = false, forceLoad = false) {
  const request = `${formName}/${scope}`
  if (formCache[request] !== undefined && !forceLoad) {
    return formCache[request]
  }

  const options = {
    ...(scope === 'create' ? {queryParams: {_display: true}} : {}),
    ...(allowNotFound && {acceptedStatusCodes: [404]})
  }

  const response = yield call(requestSaga, `forms/${request}`, options)

  if (allowNotFound && response.status === 404) {
    formCache[request] = null
    return null
  }

  const form = yield call(defaultFormTransformer, response.body)
  formCache[request] = form
  return form
}

/**
 * Helper to fetch filters of an entity
 * @param entityName {String} Name of the  entity
 */
export function* fetchSearchFilters(entityName) {
  const response = yield call(requestSaga, `client/searchfilters/${entityName}`)
  return response.body.filters
}

/**
 * Helper to fetch models.
 * @param entityName {String} Name of the entity you like to fetch the model
 */
export function* fetchModel(entityName, transformer = defaultModelTransformer) {
  const cachedModel = cache.getLongTerm('model', entityName)
  if (cachedModel) {
    return cachedModel
  }

  const resp = yield call(requestSaga, `entities/${entityName}/model`)
  const model = yield call(transformer, resp.body)
  cache.addLongTerm('model', entityName, model)
  return model
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
 * - where {String} TQL query
 * - relations {String} Relations that should be returned
 * - filters {Array} List of filter names to be applied
 * - constriction {String} Id of the constriction that should be applied
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
  where,
  relations,
  filter,
  keys,
  constriction
} = {}) => (
  {
    ...(conditions ? {conditions} : {}),
    ...(Array.isArray(fields) ? {fields: fields.length === 0 ? '!' : fields} : {}),
    ...(form ? {form} : {}),
    ...(limit ? {limit} : {}),
    ...(search ? {search} : {}),
    ...(sorting ? {sort: createSortingString(sorting)} : {}),
    ...(page && limit ? {offset: (page - 1) * limit} : {}),
    ...(paths ? {paths} : {}),
    ...(where ? {where} : {}),
    ...(Array.isArray(relations) ? {relations: relations.length === 0 ? '!' : relations} : {}),
    ...(filter ? {filter} : {}),
    ...(keys ? {keys} : {}),
    ...(constriction ? {constriction} : {})
  }
)

export const createSortingString = sorting => sorting.map(s => `${s.field} ${s.order}`).join(', ')

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

/**
 * Helper to fetch information about the currently logged in user including username and active business unit.
 */
export function* fetchPrincipal() {
  const cachedPrincipal = cache.getShortTerm('session', 'principal')
  if (cachedPrincipal !== undefined) {
    return cachedPrincipal
  }

  const principalResponse = yield call(requestSaga, 'principals')
  const {username, businessUnit: currentBusinessUnit} = principalResponse.body

  const principal = {
    username,
    currentBusinessUnit
  }

  yield cache.addShortTerm('session', 'principal', principal)

  return principal
}
