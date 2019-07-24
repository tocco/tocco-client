import pathToRegexp from 'path-to-regexp'
import {rest} from 'tocco-app-extensions'
import _get from 'lodash/get'
import _pickBy from 'lodash/pickBy'
import _pick from 'lodash/pick'

import * as actions from './actions'

import {takeLatest, fork, all, call, put, select, spawn} from 'redux-saga/effects'

export const modelSelector = (state, entity) => _get(state, `entities.path.modelCache.${entity}`, null)
export const displaySelector = (state, entity, key) => _get(state, `entities.path.displayCache.${entity}.${key}`, null)

export const breadcrumbsSelector = state => state.entities.path.breadcrumbsInfo

const isEven = n => n % 2 === 0

export const modelTransformer = json => {
  const model = {
    name: json.name,
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

export function* getModel(entity) {
  const cachedModel = yield select(modelSelector, entity)
  if (cachedModel) {
    return cachedModel
  }

  const entityModel = yield call(rest.fetchModel, entity, modelTransformer)
  yield put(actions.cacheModel(entity, entityModel))
  return entityModel
}

export function* extractMultiRelations(model) {
  const relations = _pickBy(model.paths, (value, key) => value.type === 'relation' && value.multi === true)

  const relationsTransformed = Object.keys(relations).map(k => _pick(relations[k], ['relationName', 'targetEntity']))

  yield put(actions.setRelations(relationsTransformed))
}

export function* getDisplay(entityName, key, breadcrumbsIdx) {
  const display = yield select(displaySelector, entityName, key)
  if (display) {
    return display
  }

  const query = {
    fields: [],
    relations: []
  }
  const entity = yield call(rest.fetchEntity, entityName, key, query)
  yield put(actions.setBreadcrumbDisplay(entity.display, breadcrumbsIdx))
  yield put(actions.cacheDisplay(entityName, key, entity.display))
}

export function* addEntityToBreadcrumbs(path, entityName) {
  const breadcrumbs = yield select(breadcrumbsSelector)
  const type = 'list'

  const display = entityName
  breadcrumbs.push({display, path, type})
  yield put(actions.setBreadcrumbsInfo(breadcrumbs))
}

export function* addRecordToBreadcrumbs(path, entityName, key) {
  const type = 'record'
  const breadcrumbs = yield select(breadcrumbsSelector)
  const display = '...'
  const breadcrumbsLength = breadcrumbs.push({display, path, type})
  yield put(actions.setBreadcrumbsInfo(breadcrumbs))

  if (type === 'record') {
    yield spawn(getDisplay, entityName, key, breadcrumbsLength - 1)
  }
}

export function* loadCurrentViewInfo({payload: {location}}) {
  const currentViewInfo = {
    model: null,
    key: null,
    reverseRelation: null,
    parentModel: null,
    relations: null
  }

  yield put(actions.setBreadcrumbsInfo([]))
  yield put(actions.setCurrentViewInfo(null))

  const pathParts = []
  const re = pathToRegexp('/e/:entity/:key?/:relation*/:view(list|edit|create|relations)', pathParts)
  const res = re.exec(location)

  if (res !== null) {
    const path = {}
    pathParts.forEach((key, idx) => {
      path[key.name] = res[idx + 1]
    })

    if (path.entity) {
      yield call(addEntityToBreadcrumbs, path.entity, path.entity)

      const baseEntityModel = yield call(getModel, path.entity)

      currentViewInfo.model = baseEntityModel
      if (path.key) {
        currentViewInfo.key = path.key

        yield call(addRecordToBreadcrumbs, path.entity + '/' + path.key, path.entity, path.key)

        if (path.relation) {
          const splittedRelation = path.relation.split('/')
          for (let i = 0; i < splittedRelation.length; i++) {
            const relationStringPart = splittedRelation[i]
            const breadcrumbPath = [path.entity, path.key, ...path.relation.split('/').slice(0, i + 1)].join('/')

            if (isEven(i)) {
              const relationName = relationStringPart
              const targetEntity = currentViewInfo.model.paths[relationName].targetEntity

              currentViewInfo.reverseRelation = currentViewInfo.model.paths[relationName].reverseRelationName
              currentViewInfo.parentModel = currentViewInfo.model
              currentViewInfo.model = yield call(getModel, targetEntity)

              yield call(addEntityToBreadcrumbs, breadcrumbPath, currentViewInfo.model.name)
            } else {
              const key = relationStringPart
              currentViewInfo.key = key
              yield call(addRecordToBreadcrumbs, breadcrumbPath, currentViewInfo.model.name, key)
            }
          }
        }
      }

      yield spawn(extractMultiRelations, currentViewInfo.model)
      yield put(actions.setCurrentViewInfo(currentViewInfo))
    }
  }
}

export default function* mainSagas() {
  yield all([
    fork(takeLatest, actions.LOAD_CURRENT_VIEW_INFO, loadCurrentViewInfo)
  ])
}
