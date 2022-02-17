export default {
  getOptions: ({formData}) => ({
    trueLabel: formData.intl.formatMessage({id: 'client.component.boolean-select.trueLabel'}),
    falseLabel: formData.intl.formatMessage({id: 'client.component.boolean-select.falseLabel'})
  })
}
