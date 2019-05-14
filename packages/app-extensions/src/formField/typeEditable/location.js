import _get from 'lodash/get'

export default {
  getValue: ({formField, formData}) => {
    const locationMapping = formField.locationMapping
    const filteredLocationData = formData.formValues

    let renamedLocationData = {}
    for (const locKey in locationMapping) {
      for (const filteredLocDataKey in filteredLocationData) {
        if (locationMapping[locKey] === filteredLocDataKey) {
          renamedLocationData = {...renamedLocationData, [locKey]: filteredLocationData[filteredLocDataKey]}
        }
      }
    }
    return renamedLocationData
  },
  getEvents: ({formField, formName, formData, events}) => {
    const locationMapping = formField.locationMapping || {}
    const onChange = locationObject => {
      for (const key in locationMapping) {
        if (locationMapping[key] && locationObject[key] !== undefined) {
          formData.changeFieldValue(formName, locationMapping[key], locationObject[key])
        }
      }
    }
    return {
      ...events,
      onChange,
      onBlur: () => { formData.touchField(formName, formField.id) }
    }
  },
  dataContainerProps: ({formField, formName}) => ({
    locations: formField.id,
    formValues: {
      formName: formName,
      fields: formField.locationMapping ? Object.values(formField.locationMapping) : {}
    },
    isDirty: {
      formName: formName,
      fields: formField.locationMapping
        ? [formField.locationMapping['city'], formField.locationMapping['postcode']] : []
    },
    errors: {
      formName: formName,
      fields: [formField.locationMapping['city'], formField.locationMapping['postcode']]
    }
  }),
  getOptions: ({formField, formData}) => ({
    fetchSuggestions: (searchTerm, country) =>
      formData.loadLocationsSuggestions(formField.id, searchTerm, country, _get(formField, 'countries')),
    isLoading: _get(formData, ['locations', formField.id, 'isLoading'], false),
    suggestions: _get(formData, ['locations', formField.id, 'suggestions'], null),
    mapButtonTitle: formData.intl.formatMessage({id: 'client.component.location.mapButtonTitle'})
  })
}
