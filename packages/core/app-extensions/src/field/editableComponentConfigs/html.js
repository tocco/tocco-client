const getCKEditorConfig = config => {
  // only email and correspondence editor contain all font features
  if (!['email_editor', 'correspondence_editor'].includes(config)) {
    return {
      toolbar: {
        removeItems: ['fontFamily', 'fontSize', 'fontColor']
      }
    }
  }
}

export default {
  fixLabel: () => true,
  getOptions: ({formField}) => ({
    ckEditorConfig: getCKEditorConfig(formField.htmlconfig)
  })
}
