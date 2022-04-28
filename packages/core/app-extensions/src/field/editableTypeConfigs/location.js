import _get from 'lodash/get'

/**
 * `location` field covers `city` and `postcode` value.
 */
export default {
  hasValue: ({formValues, formField}) => {
    const locationMapping = formField.locationMapping
    return !!(formValues[locationMapping.city] || formValues[locationMapping.postcode])
  },
  getValue: ({formField, formData}) => {
    const locationMapping = formField.locationMapping

    return {
      postcode: formData.formValues[locationMapping.postcode],
      city: formData.formValues[locationMapping.city]
    }
  },
  getEvents: ({formField, formName, formData, events}) => {
    const locationMapping = formField.locationMapping || {}
    const onChange = locationObject => {
      for (const key in locationMapping) {
        if (locationMapping[key] && locationObject[key] !== undefined) {
          const value = locationObject[key] !== null ? locationObject[key] : ''
          formData.changeFieldValue(formName, locationMapping[key], value)
        }
      }

      const {postcode, city} = locationObject
      formData.changeFieldValue(formName, formField.id, {
        ...(postcode !== undefined ? {postcode: postcode || ''} : {}),
        ...(city !== undefined ? {city: city || ''} : {})
      })
    }
    return {
      ...events,
      onChange,
      onBlur: () => {
        formData.touchField(formName, formField.id)
      }
    }
  },
  dataContainerProps: ({formField, formName}) => ({
    locations: [formField.id],
    formValues: {
      formName,
      fields: formField.locationMapping ? Object.values(formField.locationMapping) : {}
    }
  }),
  getOptions: ({formField, formData}) => ({
    fetchSuggestions: (searchTerm, country) =>
      formData.loadLocationsSuggestions(formField.id, searchTerm, country, _get(formField, 'countries')),
    isLoading: _get(formData, ['locations', formField.id, 'isLoading'], false),
    suggestions: _get(formData, ['locations', formField.id, 'suggestions'], null),
    mapButtonTitle: formData.intl.formatMessage({id: 'client.component.location.mapButtonTitle'}),
    locationValues: Object.keys(formField.locationMapping || {}).reduce(
      (acc, key) => ({...acc, [key]: formData.formValues[formField.locationMapping[key]]}),
      {}
    )
  }),
  getMandatoryValidation: ({formField}) => {
    const locationMapping = formField.locationMapping
    const cityValidation = formField.siblings.find(s => s.id === locationMapping.city)?.validation
    const postcodeValidation = formField.siblings.find(s => s.id === locationMapping.postcode)?.validation

    return cityValidation?.mandatory || postcodeValidation?.mandatory
  }
}
