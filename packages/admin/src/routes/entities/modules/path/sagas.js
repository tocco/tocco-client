import pathToRegexp from 'path-to-regexp'
import {rest} from 'tocco-app-extensions'
import _get from 'lodash/get'
import _pickBy from 'lodash/pickBy'
import _pick from 'lodash/pick'
import {takeLatest, fork, all, call, put, select, spawn} from 'redux-saga/effects'

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
    yield spawn(loadRelationCounts, relationsTransformed, key)
  }
}

export function* getDisplay(entityName, key, breadcrumbsIdx) {
  let display = yield select(displaySelector, entityName, key)
  if (!display) {
    display = yield call(rest.fetchDisplay, entityName, key)

    yield put(actions.cacheDisplay(entityName, key, display))
  }

  yield put(actions.setBreadcrumbDisplay(display, breadcrumbsIdx))
}

export function* addEntityToBreadcrumbs(path, entityName) {
  const breadcrumbs = yield select(breadcrumbsSelector)
  const type = 'list'
  const display = entityName

  yield put(actions.setBreadcrumbsInfo([...breadcrumbs, {display, path, type}]))
}

export function* loadRelationCounts(relations, key) {
  const a = yield all(relations.map(r => call(rest.fetchEntityCount, r.targetEntity, {
    conditions: {
      [r.reverseRelationName + '.pk']: {value: key}
    }
  })))

  const relationsCount = a.reduce((accumulator, currentValue, idx) => {
    return {...accumulator, [relations[idx].relationName]: currentValue}
  }, {})
  yield put(actions.setRelationCount(relationsCount))
}

export function* addRecordToBreadcrumbs(path, entityName, key) {
  const type = 'record'
  const breadcrumbs = yield select(breadcrumbsSelector)
  const display = '...'
  yield put(actions.setBreadcrumbsInfo([...breadcrumbs, {display, path, type}]))

  if (type === 'record') {
    yield spawn(getDisplay, entityName, key, breadcrumbs.length)
  }
}

export function* loadCurrentViewInfo({payload: {location}}) {
  const currentViewInfo = {
    model: null,
    key: null,
    reverseRelation: null,
    parentModel: null,
    relations: null,
    location
  }

  yield put(actions.setBreadcrumbsInfo([]))

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
      yield call(addEntityToBreadcrumbs, path.entity, baseEntityModel.label)
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

      yield spawn(extractMultiRelations, currentViewInfo.model, currentViewInfo.key)

      const currentViewInfos = yield select(currentViewInfosSelector)

      if (!currentViewInfos[location]) {
        yield put(actions.setCurrentViewInfo(location, currentViewInfo))
      }
    }
  }
}

export default function* mainSagas() {
  yield all([
    fork(takeLatest, actions.LOAD_CURRENT_VIEW_INFO, loadCurrentViewInfo)
  ])
}
