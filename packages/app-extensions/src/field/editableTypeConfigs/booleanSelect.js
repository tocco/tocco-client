export default {
  getOptions: ({formData}) => ({
    trueLabel: formData.intl.formatMessage({id: 'client.common.yes'}),
    falseLabel: formData.intl.formatMessage({id: 'client.common.no'})
  })
}
