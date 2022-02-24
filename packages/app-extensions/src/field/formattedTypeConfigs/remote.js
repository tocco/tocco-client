import _get from 'lodash/get'

export default {
  dataContainerProps: ({formField}) => ({
    tooltips: [formField.targetEntity],
    navigationStrategy: true
  }),
  getOptions: ({formField, formData}) => ({
    tooltips: _get(formData.tooltips, formField.targetEntity, null),
    loadTooltip: id => formData.loadTooltip(formField.targetEntity, id),
    navigationStrategy: formData.navigationStrategy,
    linkProps: {entityName: formField.targetEntity}
  })
}
