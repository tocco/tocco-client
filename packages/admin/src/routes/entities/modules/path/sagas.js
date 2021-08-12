import {rest} from 'tocco-app-extensions'
import {viewPersistor} from 'tocco-util'
import _pickBy from 'lodash/pickBy'
import _omit from 'lodash/omit'
import _pick from 'lodash/pick'
import {takeLatest, all, call, put, spawn} from 'redux-saga/effects'

import * as actions from './actions'
import {getPathInfo} from '../../utils/url'

const isEven = n => n % 2 === 0

export default function* mainSagas() {
  yield all([
    takeLatest(actions.LOAD_CURRENT_ROUTE, loadRoute)
  ])
}

export function* loadRoute({payload: {location}}) {
  const {pathname} = location

  const routeInfo = yield call(loadRouteInfo, pathname)

  if (routeInfo.length > 0) {
    const currentViewInfo = yield call(deriveCurrentViewInfo, pathname, routeInfo)

    yield put(actions.setCurrentViewInfo(pathname, currentViewInfo))

    const breadcrumbs = yield call(deriveBreadcrumbs, routeInfo)
    yield put(actions.setBreadcrumbsInfo(breadcrumbs))

    if (currentViewInfo.type === 'detail' && !currentViewInfo.error) {
      yield spawn(initMultiRelations, currentViewInfo.model, currentViewInfo.key)
    }

    yield call(viewPersistor.clearPersistedViews, currentViewInfo.level + 1)
  }
}

export function* fetchDisplaySave(entityName, key) {
  try {
    return yield call(rest.fetchDisplay, entityName, key)
  } catch {
    return null
  }
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
      const display = yield call(fetchDisplaySave, baseModel.name, path.key)

      if (display) {
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
                  relationName: relationName,
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
            const display = yield call(fetchDisplaySave, model.name, key)
            if (display) {
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
    ...(parent && lastEntry.relationName && {
      parentKey: parent.key,
      reverseRelation: parent.model.paths[lastEntry.relationName].reverseRelationName,
      parentModel: parent.model
    })
  }
}

export const deriveBreadcrumbs = routeInfos => {
  let path = ''
  return routeInfos.map(routeInfo => {
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
  }).filter(e => e)
}

export function* initMultiRelations(model, key) {
  const relations = _pickBy(model.paths, (value, key) => value.relationDisplay && value.relationDisplay.show)

  const relationsTransformed = Object.keys(relations)
    .map(k =>
      _pick(relations[k],
        ['relationName', 'reverseRelationName', 'targetEntity', 'relationDisplay.label', 'relationDisplay.order']
      )
    )
    .sort((a, b) => a.relationDisplay.order > b.relationDisplay.order ? 1 : -1)

  yield put(actions.setRelations(relationsTransformed))
  yield call(loadRelationInfos, model.name, key)
}

export function* loadRelationInfos(model, key) {
  const resource = `client/entities/${model}/${key}/relations`
  const relationInfoResponse = yield call(rest.requestSaga, resource)
  const relationsInfo = relationInfoResponse.body.relations
  yield put(actions.setRelationsInfo(relationsInfo))
}
