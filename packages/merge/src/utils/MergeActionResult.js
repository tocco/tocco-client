import {SourceEntityAction} from './../types/SourceEntityAction'

export default function createMergeResult(state) {
  const mergeStrategy = getMergeStrategyResult(state.mergeStrategy)
  const mergeMatrixResult = getMergeMatrixResult(state.mergeMatrix)

  return {...mergeStrategy, ...mergeMatrixResult}
}

export function getMergeStrategyResult(mergeStrategyState) {
  const deleteSourceEntities = (mergeStrategyState.strategies.sourceEntityAction === SourceEntityAction.DELETE)
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

  const result = []
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
  const result = []
  if (state.selections.fields) {
    Object.keys(state.selections.fields).forEach(fieldName => {
      const value = state.selections.fields[fieldName]

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
  const result = []

  if (state.selections.relations) {
    Object.keys(state.selections.relations).forEach(relationName => {
      const entityPk = state.selections.relations[relationName]

      if (entityPk !== state.targetEntityPk) {
        const entity = state.entities.find(e => e.pk === entityPk)

        const pks = []
        if (entity.relations[relationName] && entity.relations[relationName].values.length > 0) {
          pks.push(entity.relations[relationName].values[0].pk)
        }
        result.push({
          name: relationName,
          keys: pks
        })
      }
    })
  }

  return result
}

function extractToManyRelations(state) {
  const result = []

  if (state.selections.toManyRelations) {
    Object.keys(state.selections.toManyRelations).forEach(relationName => {
      result.push({
        name: relationName,
        keys: state.selections.toManyRelations[relationName][state.targetEntityPk]
      })
    })
  }

  return result
}
