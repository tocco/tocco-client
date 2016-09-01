function stringToPk(pkString) {
  return {
    className: 'nice2.entity.PrimaryKey',
    _chunks: [
      pkString
    ]
  }
}
export default function createMergeResult(state) {

  var result = {
    modelName: state.model.modelName,
    targetEntity: stringToPk(state.targetEntityPk),
    sourceEntities: state.entities.map(e => stringToPk(e.pk)),
    data: {
      fields: Object.keys(state.selections.fields).map((fieldName) => {
        return {
          fieldName,
          sourceEntity: stringToPk(state.selections.fields[fieldName])
        }
      }),
      relations: Object.keys(state.selections.relations).map((relationName) => {
        return {
          relationName,
          sourceEntity: stringToPk(state.selections.relations[relationName])
        }
      }),
      toManyRelations: Object.keys(state.selections.toManyRelations).map((relationName) => {
        return {
          relationName,
          values: state.selections.toManyRelations[relationName][state.targetEntityPk].map(v => stringToPk(v))
        }
      })
    }
  }

  return result
}
