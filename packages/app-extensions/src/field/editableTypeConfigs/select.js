import _get from 'lodash/get'

const settings = {
  LIMIT: 10000
}

export default {
  dataContainerProps: ({formField, modelField}) => ({
    relationEntities: formField.id,
    tooltips: modelField.targetEntity
  }),
  getOptions: ({formField, modelField, formData}) => ({
    options: _get(formData, ['relationEntities', formField.id, 'data'], []),
    isLoading: _get(formData, ['relationEntities', formField.id, 'isLoading'], false),
    tooltips: _get(formData.tooltips, modelField.targetEntity, null),
    loadTooltip: id => formData.loadTooltip(modelField.targetEntity, id),
    noResultsText: formData.intl.formatMessage({id: 'client.component.remoteselect.noResultsText'}),
    fetchOptions: () => formData.loadRelationEntities(formField.id, modelField.targetEntity, {
      forceReload: false,
      limit: settings.LIMIT
    })
  })
}
