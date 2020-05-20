import _get from 'lodash/get'

const settings = {
  LIMIT: 10000
}

export default {
  dataContainerProps: ({formField}) => ({
    relationEntities: formField.id,
    tooltips: formField.targetEntity
  }),
  getOptions: ({formField, modelField, formData}) => ({
    options: _get(formData, ['relationEntities', formField.id, 'data'], []),
    isLoading: _get(formData, ['relationEntities', formField.id, 'isLoading'], false),
    tooltips: _get(formData.tooltips, formField.targetEntity, null),
    loadTooltip: id => formData.loadTooltip(modelField.targetEntity, id),
    noResultsText: formData.intl.formatMessage({id: 'client.component.remoteselect.noResultsText'}),
    fetchOptions: () => formData.loadRelationEntities(formField.id, formField.targetEntity, {
      forceReload: false,
      limit: settings.LIMIT
    })
  })
}
