export default searchFieldType => {
  switch (searchFieldType) {
    case 'ch.tocco.nice2.model.form.components.simple.TextField':
      return (name, value, relationEntities, entityModel) => ({
        type: 'string',
        value: value
      })

    case 'ch.tocco.nice2.model.form.components.simple.MultiSelectBox':
      return (name, value, relationEntities, entityModel) => {
        let possibleValues = []
        if (relationEntities[entityModel[name].targetEntity]) {
          possibleValues = relationEntities[entityModel[name].targetEntity].map(r => ({
            label: r.displayName,
            value: r.value
          }))
        }

        return {
          type: 'multi-select',
          options: {
            possibleValues
          },
          value: value
        }
      }

    default:
      return {}
  }
}

