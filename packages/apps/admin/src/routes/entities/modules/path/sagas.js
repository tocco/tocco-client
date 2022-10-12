import _omit from 'lodash/omit'
import _pick from 'lodash/pick'
import _pickBy from 'lodash/pickBy'
import {all, call, put, select, spawn, takeLatest} from 'redux-saga/effects'
import {rest} from 'tocco-app-extensions'
import {viewPersistor, consoleLogger} from 'tocco-util'

import {getPathInfo} from '../../utils/url'
import * as actions from './actions'

export const entitiesPathSelector = state => state.entities.path

const relationPathRegex = /[^/]+\/?[^/]+/g
const isEven = n => n % 2 === 0

export default function* mainSagas() {
  yield all([
    takeLatest(actions.LOAD_CURRENT_ROUTE, loadRoute),
    takeLatest(actions.PROPAGATE_REFRESH, reloadRelationsInfo),
    takeLatest(actions.INVALIDATE_LAST_BREADCRUMB, invalidateLastBreadcrumb)
  ])
}

export function* loadRoute({payload: {location}}) {
  const {pathname} = location

  const routeInfo = yield call(loadRouteInfo, pathname)

  if (routeInfo.length > 0) {
    const currentViewInfo = yield call(updateCurrentViewInfo, pathname, routeInfo)
    yield call(updateBreadcrumbsInfo, routeInfo)

    if (currentViewInfo.type === 'detail' && !currentViewInfo.error) {
      yield spawn(initMultiRelations, currentViewInfo.model, currentViewInfo.key)
    }

    yield call(viewPersistor.clearPersistedViews, currentViewInfo.level + 1)
  }
}

function* updateCurrentViewInfo(pathname, routeInfo) {
  const currentViewInfo = yield call(deriveCurrentViewInfo, pathname, routeInfo)
  yield put(actions.setCurrentViewInfo(pathname, currentViewInfo))
  return currentViewInfo
}

function* updateBreadcrumbsInfo(routeInfo) {
  const breadcrumbs = yield call(deriveBreadcrumbs, routeInfo)
  yield put(actions.setBreadcrumbsInfo(breadcrumbs))
  return breadcrumbs
}

export function* loadRouteInfo(pathname) {
  const path = yield call(getPathInfo, pathname)
  const routeInfos = []

  if (path === null) {
    return routeInfos
  }

  if (path.entity) {
    let baseModel
    try {
      baseModel = yield call(rest.fetchModel, path.entity)
      routeInfos.push({
        type: 'list',
        model: baseModel
      })
    } catch (e) {
      routeInfos.push({
        type: 'list',
        error: {
          entityName: path.entity
        }
      })
      return routeInfos
    }

    if (path.key) {
      const entityExists = yield call(rest.entityExists, baseModel.name, path.key)

      if (entityExists) {
        const display = yield call(rest.fetchDisplay, baseModel.name, path.key)
        routeInfos.push({
          type: 'detail',
          key: path.key,
          model: baseModel,
          display
        })
      } else {
        routeInfos.push({
          type: 'detail',
          error: {
            entityName: baseModel.label,
            key: path.key
          }
        })

        return routeInfos
      }

      if (path.relation) {
        const splittedRelation = path.relation.split('/')

        for (let i = 0; i < splittedRelation.length; i++) {
          const relationStringPart = splittedRelation[i]

          const parent = routeInfos[routeInfos.length - 1]
          if (isEven(i)) {
            const relationName = relationStringPart
            const relation = parent.model.paths[relationName]
            if (!relation) {
              routeInfos.push({
                type: 'list',
                error: {
                  relationName,
                  entityName: parent.model.name
                }
              })
              return routeInfos
            }
            const targetEntity = relation.targetEntity

            const relationModel = yield call(rest.fetchModel, targetEntity)

            routeInfos.push({
              type: 'list',
              model: relationModel,
              relationName,
              parent
            })
          } else {
            const key = relationStringPart
            const model = parent.model
            const parentEntityExists = yield call(rest.entityExists, model.name, key)

            if (parentEntityExists) {
              const display = yield call(rest.fetchDisplay, model.name, key)
              routeInfos.push({
                type: 'detail',
                model,
                key,
                display,
                relationName: parent.relationName,
                parent: parent.parent
              })
            } else {
              routeInfos.push({
                type: 'detail',
                error: {
                  entityName: model.name,
                  key
                }
              })
              return routeInfos
            }
          }
        }
      }
    }

    if (path.view === 'create') {
      const entity = routeInfos[routeInfos.length - 1]
      const parent = routeInfos[routeInfos.length - 2]
      routeInfos.push({
        type: 'create',
        model: entity.model,
        parent,
        relationName: entity.relationName
      })
    } else if (path.actionId) {
      routeInfos.push({
        type: 'action',
        actionId: path.actionId
      })
    }
  } else if (path.actionId) {
    routeInfos.push({
      type: 'action',
      actionId: path.actionId
    })
  }

  return routeInfos
}

export const deriveCurrentViewInfo = (pathname, routeInfo) => {
  const lastEntry = routeInfo[routeInfo.length - 1]
  const parent = lastEntry.parent

  return {
    ..._omit(lastEntry, ['parent']),
    pathname,
    level: routeInfo.length - 1,
    ...(parent &&
      lastEntry.relationName && {
        parentKey: parent.key,
        reverseRelation: parent.model.paths[lastEntry.relationName].reverseRelationName,
        parentModel: parent.model
      })
  }
}

export const deriveBreadcrumbs = routeInfos => {
  let path = ''
  return routeInfos
    .map(routeInfo => {
      if (routeInfo.error) {
        return {type: 'error'}
      }
      if (routeInfo.type === 'action') {
        return null
      }
      path = (path ? path + '/' : '') + (routeInfo.key ? routeInfo.key : routeInfo.relationName || routeInfo.model.name)
      return {
        type: routeInfo.type,
        display: routeInfo.display || routeInfo.model.label,
        path: path + '/' + routeInfo.type
      }
    })
    .filter(e => e)
}

export function* initMultiRelations(model, key) {
  const relations = _pickBy(model.paths, value => value.relationDisplay && value.relationDisplay.show)

  const relationsTransformed = Object.keys(relations)
    .map(k =>
      _pick(relations[k], [
        'relationName',
        'reverseRelationName',
        'targetEntity',
        'relationDisplay.label',
        'relationDisplay.order'
      ])
    )
    .sort((a, b) => (a.relationDisplay.order > b.relationDisplay.order ? 1 : -1))

  yield put(actions.selectRelation(null))
  yield put(actions.setRelations(relationsTransformed))
  yield call(loadRelationInfos, model.name, key)
}

export function* reloadRelationsInfo({payload: {location}}) {
  const {pathname} = location
  const {currentViewInfos} = yield select(entitiesPathSelector)
  const currentViewInfo = currentViewInfos[pathname]
  if (currentViewInfo.type === 'detail' && !currentViewInfo.error) {
    yield spawn(loadRelationInfos, currentViewInfo.model.name, currentViewInfo.key)
    yield put(actions.selectRelation(null))
  }
}

export function* invalidateLastBreadcrumb({payload: {location}}) {
  const {pathname} = location

  const path = yield call(getPathInfo, pathname)

  if (path?.entity && path?.key) {
    try {
      const lastEntity = yield call(getLastEntityInPath, path)
      if (lastEntity) {
        const {entityName, key} = lastEntity
        yield call(rest.invalidateDisplay, entityName, key)
        const display = yield call(rest.fetchDisplay, entityName, key)

        yield put(actions.setCurrentViewInfo(pathname, {display}))

        const breadcrumbsPath = yield call(getLastBreadcrumbsPath, pathname)
        yield put(actions.updateBreadcrumbsInfo(breadcrumbsPath, {display}))
      }
    } catch (e) {
      // could not load model or delete cache
      consoleLogger.logError('breadcrumbs invalidation failed', e)
    }
  }
}

function* getLastBreadcrumbsPath(pathname) {
  const path = yield call(getPathInfo, pathname)

  if (path === null || !path.entity) {
    return ''
  }

  // concatenates defined path segments separated with a slash => ${entity}/${key}/${relation}/${view}
  return [path.entity, path.key, path.relation, path.view].filter(Boolean).join('/')
}

function* getLastEntityInPath(path) {
  if (!path || !path.entity || !path.key || path.view === 'action') {
    return null
  }

  const baseModel = yield call(rest.fetchModel, path.entity)

  if (!path.relation) {
    // no relations => base entity is the last entity
    return {entityName: baseModel.name, key: path.key}
  }

  const splittedEntities = path.relation.match(relationPathRegex)
  if (splittedEntities.length < 1) {
    return null
  }

  let parentModel = baseModel
  let lastEntity = null

  for (let i = 0; i < splittedEntities.length; i++) {
    const [relationName, key] = splittedEntities[i].split('/')
    const relation = parentModel.paths[relationName]

    if (!relation || !key) {
      // no key = no entity (e.g. list or create view)
      return null
    }

    parentModel = yield call(rest.fetchModel, relation.targetEntity)
    lastEntity = {entityName: parentModel.name, key}
  }

  return lastEntity
}

export function* loadRelationInfos(model, key) {
  const resource = `client/entities/${model}/${key}/relations`
  const relationInfoResponse = yield call(rest.requestSaga, resource)
  const relationsInfo = relationInfoResponse.body.relations
  yield put(actions.setRelationsInfo(relationsInfo))
}
