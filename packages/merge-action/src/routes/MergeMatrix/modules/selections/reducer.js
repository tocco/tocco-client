import {SELECT_SOURCE_FIELD, SELECT_SOURCE_RELATION, TOGGLE_RELATION_MANY} from './actions'

function changeSourceField(state, {field, entityPk}) {
  return {...state, fields: {...state.fields, [field]: entityPk}}
}

function changeSourceRelation(state, {relationName, entityPk}) {
  return {...state, relations: {...state.relations, [relationName]: entityPk}}
}

function toggleRelationMany(state, {relationName, relationPk, entityPk}) {
  var newState = {...state}
  
  if (!newState.toManyRelations[relationName]) {
    newState.toManyRelations[relationName] = {}
  }

  var relation = newState.toManyRelations[relationName]

  if (!relation[entityPk]) {
    relation[entityPk] = []
  }

  var idx = relation[entityPk].indexOf(relationPk)

  if (idx >= 0) {
    relation[entityPk].splice(idx, 1)
  } else {
    relation[entityPk].push(relationPk)
  }

  return newState
}

const ACTION_HANDLERS = {
  [SELECT_SOURCE_FIELD]: changeSourceField,
  [SELECT_SOURCE_RELATION]: changeSourceRelation,
  [TOGGLE_RELATION_MANY]: toggleRelationMany
}

const initialState = {fields: {}, relations: {}, toManyRelations: {}}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
