function stringToPk(pkString) {
  return {
    className: 'nice2.entity.PrimaryKey',
    _chunks: [
      pkString
    ]
  }
}
export default function createMergeResult(mergeMatrixState) {
  var result = {
    modelName: mergeMatrixState.model.modelName,
    targetEntity: mergeMatrixState.targetEntityPk,
    sourceEntities: mergeMatrixState.entities.map(e => e.pk),
    data: {
      fields: extractFields(mergeMatrixState),
      relations: extractRelations(mergeMatrixState),
      toManyRelations: extractToManyRelations(mergeMatrixState)
    }
  }
  return result
}

function extractFields(state) {
  var result = []
  if (state.selections.fields) {

    Object.keys(state.selections.fields).map((fieldName) => {
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
    Object.keys(state.selections.relations).map((relationName) => {
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
    Object.keys(state.selections.toManyRelations).map((relationName) => {
      result.push({
        name: relationName,
        keys: state.selections.toManyRelations[relationName][state.targetEntityPk]
      })
    })
  }

  return result
}
