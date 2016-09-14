import {SELECT_SOURCE_FIELD, SELECT_SOURCE_RELATION, TOGGLE_RELATION_MANY, CLEAR_RELATION_MANY} from './actions'

function changeSourceField(state, {payload}) {
  return {...state, fields: {...state.fields, [payload.field]: payload.entityPk}}
}

function changeSourceRelation(state, {payload}) {
  return {...state, relations: {...state.relations, [payload.relationName]: payload.entityPk}}
}

function toggleRelationMany(state, {payload}) {
  var newState = {...state}

  if (!newState.toManyRelations[payload.relationName]) {
    newState.toManyRelations[payload.relationName] = {}
  }

  var relation = newState.toManyRelations[payload.relationName]

  if (!relation[payload.entityPk]) {
    relation[payload.entityPk] = []
  }

  var idx = relation[payload.entityPk].indexOf(payload.relationPk)

  if (idx >= 0) {
    relation[payload.entityPk].splice(idx, 1)
  } else {
    relation[payload.entityPk].push(payload.relationPk)
  }

  return newState
}

function clearRelationMany(state) {
  return {...state, toManyRelations: {}}
}

const ACTION_HANDLERS = {
  [SELECT_SOURCE_FIELD]: changeSourceField,
  [SELECT_SOURCE_RELATION]: changeSourceRelation,
  [TOGGLE_RELATION_MANY]: toggleRelationMany,
  [CLEAR_RELATION_MANY]: clearRelationMany
}

const initialState = {fields: {}, relations: {}, toManyRelations: {}}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
