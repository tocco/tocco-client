import _get from 'lodash/get'

export default {
  dataContainerProps: () => ({
    tooltips: ['Resource'],
    navigationStrategy: true
  }),
  getOptions: ({formData}) => ({
    downloadTitle: formData.intl.formatMessage({id: 'client.component.upload.downloadTitle'}),
    tooltips: _get(formData.tooltips, 'Resource', null),
    loadTooltip: id => formData.loadTooltip('Resource', id)
  })
}
