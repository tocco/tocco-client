export default searchFieldType => {
  switch (searchFieldType) {
    case 'ch.tocco.nice2.model.form.components.simple.TextField':
      return (name, value, relationEntities, entityModel) => ({
        type: 'string',
        value: value,
        id: name
      })

    case 'ch.tocco.nice2.model.form.components.simple.SingleSelectBox':
      return (name, value, relationEntities, entityModel) => {
        let store = []
        if (relationEntities[entityModel[name].targetEntity]) {
          store = relationEntities[entityModel[name].targetEntity].map(r => ({
            value: r.value,
            label: r.displayName
          }))
        }

        return {
          type: 'single-select',
          options: {
            store
          },
          value: value,
          id: name
        }
      }

    case 'ch.tocco.nice2.model.form.components.simple.MultiSelectBox':
      return (name, value, relationEntities, entityModel) => {
        let store = []
        if (relationEntities[entityModel[name].targetEntity]) {
          store = relationEntities[entityModel[name].targetEntity].map(r => ({
            value: r.value,
            label: r.displayName
          }))
        }

        return {
          type: 'multi-select',
          options: {
            store
          },
          value: value,
          id: name
        }
      }

    default:
      return {}
  }
}

