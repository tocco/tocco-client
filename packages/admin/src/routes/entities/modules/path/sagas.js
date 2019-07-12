import pathToRegexp from 'path-to-regexp'
import {rest} from 'tocco-app-extensions'
import _get from 'lodash/get'

import * as actions from './actions'

import {takeLatest, fork, all, call, put, select} from 'redux-saga/effects'

export const modelSelector = (state, entity) => _get(state, `state.path.modelCache.${entity}`, null)

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

export function* loadCurrentViewInfo({payload: {location}}) {
  yield put(actions.setCurrentViewInfo(null))
  const keys = []
  const re = pathToRegexp('/e/:entity/:key?/:relation*/:view(list|edit|create|relations)', keys)
  const res = re.exec(location)

  if (res !== null) {
    const path = {}
    keys.forEach((key, idx) => {
      path[key.name] = res[idx + 1]
    })

    if (path.entity) {
      const entityModel = yield call(getModel, path.entity)
      let model = entityModel
      let key = path.key
      let reverseRelation
      let parentModel

      if (path.relation) {
        let idx = 0
        for (const name of path.relation.split('/')) {
          if (isEven(idx)) {
            const targetEntity = model.paths[name].targetEntity

            reverseRelation = model.paths[name].reverseRelationName
            parentModel = model
            model = yield call(getModel, targetEntity)
          } else {
            key = name
          }
          idx++
        }
      }
      yield put(actions.setCurrentViewInfo({
        model,
        key,
        reverseRelation,
        parentModel
      }))
    }
  }
}

export default function* mainSagas() {
  yield all([
    fork(takeLatest, actions.LOAD_CURRENT_VIEW_INFO, loadCurrentViewInfo)
  ])
}
