import {all, call, takeEvery} from 'redux-saga/effects'

import * as actions from './actions'
import {requestSaga} from '../../rest/rest'

export default function* sagas() {
  yield all([
    takeEvery(actions.LOAD_MODEL, loadModel)
  ])
}

const buildRelationLabel = relation => {
  if (relation.relationName.substring(3) !== relation.targetEntity) {
    return `${relation.relationName} (${relation.targetEntity})`
  } else {
    return relation.relationName
  }
}

export function* loadModel({
  payload: {
    path,
    callback
  }
}) {
  if (path.length > 0) {
    const [sourceModel, ...relationSteps] = path
    const {body} = yield call(requestSaga, `entities/${sourceModel}/model/resolve?path=${relationSteps.join('.')}`)
    const fields = body.fields || []
    const relations = body.relations || []
    const availablePaths = [
      ...(fields.map(f => ({
        label: `${f.fieldName} (${f.type})`,
        value: f.fieldName,
        type: 'field'
      }))),
      ...(relations.map(r => ({
        label: buildRelationLabel(r),
        value: r.relationName,
        type: 'relation'
      })))
    ]
    callback(availablePaths)
  } else {
    const {body: {entities}} = yield call(requestSaga, 'entities')
    callback(Object.keys(entities))
  }
}
