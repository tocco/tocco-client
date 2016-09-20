import {SourceEntityAction} from './../types/SourceEntityAction'

export default function createMergeResult(state) {
  var mergeStrategy = getMergeStrategyResult(state.mergeStrategy)
  var mergeMatrixResult = getMergeMatrixResult(state.mergeMatrix)

  return {...mergeStrategy, ...mergeMatrixResult}
}

export function getMergeStrategyResult(mergeStrategyState) {
  var deleteSourceEntities = (mergeStrategyState.strategies.sourceEntityAction === SourceEntityAction.DELETE)
  return {
    copyRemainingRelations: mergeStrategyState.strategies.copyRelations,
    sourceEntityConfig: {
      deleteSourceEntities,
      updateValues: extractUpdateValues(mergeStrategyState)
    }

  }
}

function extractUpdateValues(mergeStrategyState) {
  if (mergeStrategyState.strategies.sourceEntityAction !== SourceEntityAction.EDIT
    || !mergeStrategyState.editOptions) {
    return []
  }

  var result = []
  mergeStrategyState.editOptions.forEach(editOptions => {
    if (editOptions.active) {
      result.push(
        {
          type: editOptions.type,
          name: editOptions.name,
          value: editOptions.value
        }
      )
    }
  })
  return result
}

export function getMergeMatrixResult(mergeMatrixState) {
  return {
    modelName: mergeMatrixState.model.modelName,
    targetEntity: mergeMatrixState.targetEntityPk,
    sourceEntities: mergeMatrixState.entities.filter(e => e.pk !== mergeMatrixState.targetEntityPk).map(e => e.pk),
    data: {
      fields: extractFields(mergeMatrixState),
      relations: extractRelations(mergeMatrixState),
      toManyRelations: extractToManyRelations(mergeMatrixState)
    }
  }
}

function extractFields(state) {
  var result = []
  if (state.selections.fields) {
    Object.keys(state.selections.fields).forEach((fieldName) => {
      var value = state.selections.fields[fieldName]

      if (value !== state.targetEntityPk) {
        result.push({
          name: fieldName,
          pk: value
        })
      }
    })
  }

  return result
}

function extractRelations(state) {
  var result = []

  if (state.selections.relations) {
    Object.keys(state.selections.relations).forEach((relationName) => {
      var entityPk = state.selections.relations[relationName]

      if (entityPk !== state.targetEntityPk) {
        var entity = state.entities.find(e => e.pk === entityPk)
        result.push({
          name: relationName,
          keys: [entity.relations[relationName].values[0].pk]
        })
      }
    })
  }

  return result
}

function extractToManyRelations(state) {
  var result = []

  if (state.selections.toManyRelations) {
    Object.keys(state.selections.toManyRelations).forEach((relationName) => {
      result.push({
        name: relationName,
        keys: state.selections.toManyRelations[relationName][state.targetEntityPk]
      })
    })
  }

  return result
}
