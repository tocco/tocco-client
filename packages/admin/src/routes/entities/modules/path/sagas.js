import pathToRegexp from 'path-to-regexp'
import {rest, viewPersistor} from 'tocco-app-extensions'
import _get from 'lodash/get'
import _pickBy from 'lodash/pickBy'
import _pick from 'lodash/pick'
import {takeLatest, all, call, put, select, spawn} from 'redux-saga/effects'

import * as actions from './actions'

export const modelSelector = (state, entity) => _get(state, `entities.path.modelCache.${entity}`, null)
export const displaySelector = (state, entity, key) => _get(state, `entities.path.displayCache.${entity}.${key}`, null)

export const breadcrumbsSelector = state => state.entities.path.breadcrumbsInfo
export const currentViewInfosSelector = state => state.entities.path.currentViewInfos

const isEven = n => n % 2 === 0

export function* getModel(entity) {
  const cachedModel = yield select(modelSelector, entity)
  if (cachedModel) {
    return cachedModel
  }

  const entityModel = yield call(rest.fetchModel, entity)
  yield put(actions.cacheModel(entity, entityModel))
  return entityModel
}

export function* extractMultiRelations(model, key) {
  if (key !== null) {
    const relations = _pickBy(model.paths, (value, key) => value.relationDisplay && value.relationDisplay.show)

    const relationsTransformed = Object.keys(relations)
      .map(k =>
        _pick(relations[k],
          ['relationName', 'reverseRelationName', 'targetEntity', 'relationDisplay.label', 'relationDisplay.order']
        )
      )
      .sort((a, b) => a.relationDisplay.order > b.relationDisplay.order ? 1 : -1)

    yield put(actions.setRelations(relationsTransformed))
    yield spawn(loadRelationCounts, model.name, key)
  }
}

export function* getDisplay(entityName, key, breadcrumbsIdx) {
  let display = yield select(displaySelector, entityName, key)
  if (!display) {
    display = yield call(rest.fetchDisplay, entityName, key)

    yield put(actions.cacheDisplay(entityName, key, display))
  }

  return display
}

export function* addEntityToBreadcrumbs(path, entityName, breadcrumbs) {
  const type = 'list'
  const display = entityName

  breadcrumbs.push({display, path, type})
}

export function* loadRelationCounts(model, key) {
  const resource = `/client/entities/${model}/${key}/relation-count`
  const relationCountRepsonse = yield call(rest.requestSaga, resource)
  yield put(actions.setRelationCount(relationCountRepsonse.body.relationCounts))
}

export function* addRecordToBreadcrumbs(path, entityName, key, breadcrumbs) {
  const type = 'record'
  const display = yield call(getDisplay, entityName, key, breadcrumbs.length)
  breadcrumbs.push({display, path, type})
}

export function* loadCurrentViewInfo({payload: {location}}) {
  const currentViewInfo = {
    model: null,
    key: null,
    reverseRelation: null,
    parentModel: null,
    relations: null,
    location,
    level: 0
  }

  const breadcrumbs = []

  const pathParts = []
  const re = pathToRegexp('/e/:entity/:key?/:relation*/:view(list|detail|edit|create|relations)', pathParts)
  const res = re.exec(location)

  if (res !== null) {
    const path = {}
    pathParts.forEach((key, idx) => {
      path[key.name] = res[idx + 1]
    })

    if (path.entity) {
      const baseEntityModel = yield call(getModel, path.entity)
      yield call(addEntityToBreadcrumbs, path.entity, baseEntityModel.label, breadcrumbs)
      currentViewInfo.model = baseEntityModel
      currentViewInfo.level = 0

      if (path.key) {
        currentViewInfo.key = path.key
        currentViewInfo.level = 1

        yield call(addRecordToBreadcrumbs, path.entity + '/' + path.key, path.entity, path.key, breadcrumbs)

        if (path.relation) {
          const splittedRelation = path.relation.split('/')
          for (let i = 0; i < splittedRelation.length; i++) {
            const relationStringPart = splittedRelation[i]
            const breadcrumbPath = [path.entity, path.key, ...path.relation.split('/').slice(0, i + 1)].join('/')

            currentViewInfo.level = i + 2

            if (isEven(i)) {
              const relationName = relationStringPart
              const targetEntity = currentViewInfo.model.paths[relationName].targetEntity
              currentViewInfo.reverseRelation = currentViewInfo.model.paths[relationName].reverseRelationName
              currentViewInfo.parentModel = currentViewInfo.model
              currentViewInfo.model = yield call(getModel, targetEntity)

              yield call(addEntityToBreadcrumbs, breadcrumbPath, currentViewInfo.model.label, breadcrumbs)
            } else {
              const key = relationStringPart
              currentViewInfo.key = key
              yield call(addRecordToBreadcrumbs, breadcrumbPath, currentViewInfo.model.name, key, breadcrumbs)
            }
          }
        }
      }

      yield spawn(extractMultiRelations, currentViewInfo.model, currentViewInfo.key)

      const currentViewInfos = yield select(currentViewInfosSelector)

      if (!currentViewInfos[location]) {
        yield put(actions.setCurrentViewInfo(location, currentViewInfo))
      }

      yield put(viewPersistor.clearPersistedViews(currentViewInfo.level + 1))
    }
  }

  yield put(actions.setBreadcrumbsInfo(breadcrumbs))
}

export default function* mainSagas() {
  yield all([
    takeLatest(actions.LOAD_CURRENT_VIEW_INFO, loadCurrentViewInfo)
  ])
}
