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
        formData.changeFieldValue(formName, locationMapping[key], locationObject[key])
      }
    }
    return {
      ...events,
      onChange
    }
  },
  dataContainerProps: ({formField, formName}) => ({
    locations: formField.id,
    formValues: {
      formName: formName,
      fields: Object.values(formField.locationMapping)
    }
  }),
  getOptions: ({formField, formData}) => ({
    fetchSuggestions: searchTerm => formData.loadLocationsSuggestions(formField.id, searchTerm),
    isLoading: _get(formData, ['locations', formField.id, 'isLoading'], false),
    suggestions: _get(formData, ['locations', formField.id, 'suggestions'], null)
  })
}
