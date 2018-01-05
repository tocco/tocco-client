export const transformModel = restModel => {
  const model = {}
  restModel.fields.forEach(field => {
    model[field.fieldName] = {
      ...field
    }
  })

  restModel.relations.forEach(relation => {
    model[relation.relationName] = {
      type: 'relation',
      ...relation
    }
  })

  return model
}
