export default {
  getOptions: ({formField, modelField, formData, formName}) => ({
    upload: document => {
      formData.uploadDocument(formName, formField.id, document)
    },
    uploadText: formData.intl.formatMessage({id: 'client.component.upload.upload'}),
    uploadingText: formData.intl.formatMessage({id: 'client.component.upload.uploading'}),
    downloadText: formData.intl.formatMessage({id: 'client.component.upload.downloadTitle'}),
    deleteText: formData.intl.formatMessage({id: 'client.component.upload.deleteTitle'})
  })
}
