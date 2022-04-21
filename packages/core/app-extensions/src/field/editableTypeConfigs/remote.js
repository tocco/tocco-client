import _get from 'lodash/get'

const settings = {
  SEARCH_RESULT_LIMIT: 50,
  SUGGESTION_LIMIT: 10,
  SUGGESTION_ORDER_FIELD: 'update_timestamp'
}

const getExcludeConstraint = value =>
  !value || !Array.isArray(value) || value.length === 0 ? undefined : `not KEYS(${value.map(v => v.key).join(', ')})`

export default {
  dataContainerProps: ({formField}) => ({
    relationEntities: [formField.id],
    tooltips: [formField.targetEntity],
    navigationStrategy: true
  }),
  getOptions: ({formField, formName, formData}) => ({
    options: _get(formData, ['relationEntities', formField.id, 'data'], []),
    moreOptionsAvailable: _get(formData, ['relationEntities', formField.id, 'moreEntitiesAvailable'], false),
    isLoading: _get(formData, ['relationEntities', formField.id, 'isLoading'], false),
    fetchOptions: currentValue => {
      formData.loadRelationEntities(formField.id, formField.targetEntity, {
        forceReload: true,
        limit: settings.SUGGESTION_LIMIT,
        sorting: [{field: settings.SUGGESTION_ORDER_FIELD, order: 'desc'}],
        formBase: formField.formBase,
        formName: formField.formName,
        where: getExcludeConstraint(currentValue)
      })
    },
    searchOptions: (searchTerm, value) => {
      formData.loadRelationEntities(formField.id, formField.targetEntity, {
        searchTerm,
        limit: settings.SEARCH_RESULT_LIMIT,
        forceReload: true,
        formBase: formField.formBase,
        formName: formField.formName,
        where: getExcludeConstraint(value)
      })
    },
    openAdvancedSearch: value => formData.openAdvancedSearch(formName, formField, value),
    tooltips: _get(formData.tooltips, formField.targetEntity, null),
    loadTooltip: id => formData.loadTooltip(formField.targetEntity, id),
    noResultsText: formData.intl.formatMessage({id: 'client.component.remoteselect.noResultsText'}),
    moreOptionsAvailableText: formData.intl.formatMessage({
      id: 'client.component.remoteselect.moreOptionsAvailableText'
    }),
    DetailLink:
      formData.navigationStrategy && formData.navigationStrategy.DetailLink
        ? ({entityKey, children}) => (
            <formData.navigationStrategy.DetailLink entityName={formField.targetEntity} entityKey={entityKey}>
              {children}
            </formData.navigationStrategy.DetailLink>
          )
        : null,
    createPermission:
      formField.relationName &&
      _get(formData, ['entityModel', 'paths', formField.relationName, 'createPermission'], false),
    openRemoteCreate: value => formData.openRemoteCreate(formField, formName, value)
  })
}
