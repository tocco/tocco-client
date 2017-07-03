import {call} from 'redux-saga/effects'
import {requestSaga} from 'tocco-util/src/rest'
import {SubmissionError} from 'redux-form'
import {validationErrorToFormError} from '../detailView/reduxForm'

export function* fetchEntity(entityName, id, fields, formName) {
  const options = {
    queryParams: {
      '_paths': fields.join(','),
      '_form': formName
    }
  }

  const resp = yield call(requestSaga, `entities/${entityName}/${id}`, options)
  return resp.body
}

export function* updateEntity(entity, fields = []) {
  const options = {
    method: 'PATCH',
    queryParams: {
      '_paths': fields.join(',')
    },
    body: entity,
    acceptedErrorCodes: ['VALIDATION_FAILED']
  }
  const resource = `entities/${entity.model}/${entity.key}`
  const resp = yield call(requestSaga, resource, options)

  if (resp.body.errorCode === 'VALIDATION_FAILED') {
    throw new SubmissionError(validationErrorToFormError(entity, resp.body.errors))
  }

  return resp.body
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
  const resp = yield call(requestSaga, `entities/${entityName}/model`)
  return transformer(resp.body)
}

const defaultEntitiesTransformer = json => (json)
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

export function* fetchEntities(entityName, searchInputs, transformer = defaultEntitiesTransformer) {
  const queryParams = buildParams(searchInputs)
  const resp = yield call(requestSaga, `entities/${entityName}`, {
    queryParams
  })
  return transformer(resp.body)
}
