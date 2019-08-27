import {SubmissionError} from 'redux-form'
import {form, rest} from 'tocco-app-extensions'
import {call} from 'redux-saga/effects'

export function* fetchEntity(entityName, id, paths, formName) {
  const options = {
    queryParams: {
      _paths: paths.join(','),
      _form: formName
    }
  }

  const resp = yield call(rest.requestSaga, `entities/${entityName}/${id}`, options)
  return resp.body
}

export function* updateEntity(entity, paths = []) {
  const options = {
    method: 'PATCH',
    queryParams: {
      _paths: paths.join(',')
    },
    body: entity,
    acceptedErrorCodes: ['VALIDATION_FAILED']
  }
  const resource = `entities/${entity.model}/${entity.key}`
  const resp = yield call(rest.requestSaga, resource, options)

  if (resp.body.errorCode === 'VALIDATION_FAILED') {
    throw new SubmissionError(form.validationErrorToFormError(entity, resp.body.errors))
  }

  return resp.body
}

const SUCCESSFUL_SAVED_STATUS = 201

export function* createEntity(entity, paths = []) {
  const options = {
    method: 'POST',
    queryParams: {
      _paths: paths.join(',')
    },
    body: entity,
    acceptedErrorCodes: ['VALIDATION_FAILED']
  }
  const resource = `entities/${entity.model}`
  const resp = yield call(rest.requestSaga, resource, options)

  if (resp.status === SUCCESSFUL_SAVED_STATUS) {
    const location = resp.headers.get('Location')
    const id = location.split('/').pop()
    return id
  } else {
    if (resp.body && resp.body.errorCode === 'VALIDATION_FAILED') {
      throw new SubmissionError(form.validationErrorToFormError(entity, resp.body.errors))
    }

    throw new Error('unexpected error during save', resp)
  }
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

export function* fetchModel(entityName, transformer = defaultModelTransformer) {
  const resp = yield call(rest.requestSaga, `entities/${entityName}/model`)
  return yield call(transformer, resp.body)
}

export const defaultEntitiesTransformer = json => (json)
export const selectEntitiesTransformer = json => (json.data.map(e => ({display: e.display, key: e.key})))

function buildParams({
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
    _sort: Object.keys(orderBy || {}).length === 2 ? `${orderBy.name} ${orderBy.direction}` : undefined,
    _paths: paths.join(','),
    _fields: fields && fields.length === 0 ? '!' : fields ? fields.join(',') : null,
    _relations: relations && relations.length === 0 ? '!' : relations ? relations.join(',') : null,
    _form: formName,
    _filter: searchFilters.join(','),
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

export function* fetchEntities(entityName, searchInputs, transformer = defaultEntitiesTransformer) {
  const queryParams = buildParams(searchInputs)
  const resp = yield call(rest.requestSaga, `entities/${entityName}`, {
    queryParams
  })
  return yield call(transformer, resp.body)
}
