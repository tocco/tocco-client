import {rest, viewPersistor} from 'tocco-app-extensions'
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

  let routeInfo = []
  try {
    routeInfo = yield call(loadRouteInfo, pathname)
  } catch (error) {
    yield put(actions.setCurrentViewInfo(pathname, {error}))
  }

  if (routeInfo.length > 0) {
    const currentViewInfo = yield call(deriveCurrentViewInfo, pathname, routeInfo)

    yield put(actions.setCurrentViewInfo(pathname, currentViewInfo))

    const breadcrumbs = yield call(deriveBreadcrumbs, routeInfo)
    yield put(actions.setBreadcrumbsInfo(breadcrumbs))

    if (currentViewInfo.type === 'detail') {
      yield spawn(initMultiRelations, currentViewInfo.model, currentViewInfo.key)
    }

    yield put(viewPersistor.clearPersistedViews(currentViewInfo.level + 1))
  }
}

export function* loadRouteInfo(pathname) {
  const path = yield call(getPathInfo, pathname)
  const routeInfos = []

  if (path === null) {
    return routeInfos
  }

  if (path.entity) {
    const baseModel = yield call(rest.fetchModel, path.entity)

    routeInfos.push({
      type: 'list',
      model: baseModel
    })

    if (path.key) {
      const display = yield call(rest.fetchDisplay, baseModel.name, path.key)

      routeInfos.push({
        type: 'detail',
        key: path.key,
        model: baseModel,
        display
      })

      if (path.relation) {
        const splittedRelation = path.relation.split('/')

        for (let i = 0; i < splittedRelation.length; i++) {
          const relationStringPart = splittedRelation[i]

          const parent = routeInfos[routeInfos.length - 1]
          if (isEven(i)) {
            const relationName = relationStringPart
            const targetEntity = parent.model.paths[relationName].targetEntity
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
            routeInfos.push({
              type: 'detail',
              model,
              key,
              display: yield call(rest.fetchDisplay, model.name, key),
              relationName: parent.relationName,
              parent: parent.parent
            })
          }
        }
      }
    }

    if (path.actionId) {
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
    path = (path ? path + '/' : '') + (routeInfo.key ? routeInfo.key : routeInfo.relationName || routeInfo.model.name)
    return {
      type: routeInfo.type,
      display: routeInfo.type === 'list' ? routeInfo.model.label : routeInfo.display,
      path: path + '/' + routeInfo.type
    }
  })
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
  const resource = `/client/entities/${model}/${key}/relations`
  const relationInfoResponse = yield call(rest.requestSaga, resource)
  const relationsInfo = relationInfoResponse.body.relations
  yield put(actions.setRelationsInfo(relationsInfo))
}
