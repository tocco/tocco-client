import {request, getRequest} from 'tocco-util/src/rest'
import {SubmissionError} from 'redux-form'
import {validationErrorToFormError} from '../detailView/reduxForm'

export function fetchEntity(entityName, id, fields, formName) {
  const params = {
    '_paths': fields.join(','),
    '_form': formName
  }

  return request(`entities/${entityName}/${id}`, params)
    .then(resp => resp.body)
}

export function updateEntity(entity, fields) {
  const params = {
    '_paths': fields.join(',')
  }
  return request(`entities/${entity.model}/${entity.key}`, params, 'PATCH', entity, ['VALIDATION_FAILED'])
    .then(resp => {
      if (resp.body.errorCode === 'VALIDATION_FAILED') {
        throw new SubmissionError(validationErrorToFormError(entity, resp.body.errors))
      }
      return resp.body
    })
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

export function fetchModel(entityName, transformer = defaultModelTransformer) {
  return request(`entities/${entityName}/model`)
    .then(resp => resp.body)
    .then(json => transformer(json))
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

export function fetchEntities(entityName, searchInputs,
                              transformer = defaultEntitiesTransformer) {
  const params = buildParams(searchInputs)
  return getRequest(`entities/${entityName}`, params, [])
    .then(resp => resp.body)
    .then(json => transformer(json))
}
