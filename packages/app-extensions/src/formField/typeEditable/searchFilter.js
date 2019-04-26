import _get from 'lodash/get'

export default {
  dataContainerProps: ({formField}) => ({
    searchFilters: formField.model
  }),
  getOptions: ({formField, formData}) => ({
    isMulti: formField.multiple,
    options: _get(formData.searchFilters, formField.model, null),
    fetchOptions: () => formData.loadSearchFilters(formField.model, formField.group),
    noResultsText: formData.intl.formatMessage({id: 'client.component.searchfilter.noResultsText'})
  })
}
