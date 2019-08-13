import _get from 'lodash/get'

const settings = {
  SEARCH_RESULT_LIMIT: 50,
  SUGGESTION_LIMIT: 10,
  SUGGESTION_ORDER_FIELD: 'update_timestamp'
}

export default {
  dataContainerProps: ({formField, modelField}) => ({
    relationEntities: formField.id,
    tooltips: modelField.targetEntity,
    linkFactory: true
  }),
  getOptions: ({formField, modelField, formName, formData}) => ({
    options: _get(formData, ['relationEntities', formField.id, 'data'], []),
    moreOptionsAvailable: _get(formData, ['relationEntities', formField.id, 'moreEntitiesAvailable'], false),
    isLoading: _get(formData, ['relationEntities', formField.id, 'isLoading'], false),
    fetchOptions: () => formData.loadRelationEntities(formField.id, modelField.targetEntity, {
      forceReload: true,
      limit: settings.SUGGESTION_LIMIT,
      sorting: [{field: settings.SUGGESTION_ORDER_FIELD, order: 'desc'}],
      formBase: formField.formBase
    }),
    searchOptions: searchTerm => formData.loadRelationEntities(formField.id, modelField.targetEntity, {
      searchTerm,
      limit: settings.SEARCH_RESULT_LIMIT,
      forceReload: true,
      formBase: formField.formBase
    }),
    openAdvancedSearch: value => formData.openAdvancedSearch(formName, formField, modelField, value),
    tooltips: _get(formData.tooltips, modelField.targetEntity, null),
    loadTooltip: id => formData.loadTooltip(modelField.targetEntity, id),
    noResultsText: formData.intl.formatMessage(
      {id: 'client.component.remoteselect.noResultsText'}
    ),
    moreOptionsAvailableText: formData.intl.formatMessage(
      {id: 'client.component.remoteselect.moreOptionsAvailableText'}
    ),
    valueLinkFactory: formData.linkFactory && formData.linkFactory.detail
      ? (key, content) => formData.linkFactory.detail(modelField.targetEntity, modelField.relationName, key, content)
      : null
  })
}
