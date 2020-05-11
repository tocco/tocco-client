export default {
  getOptions: ({formData}) => ({
    downloadTitle: formData.intl.formatMessage({id: 'client.component.upload.downloadTitle'})
  })
}
