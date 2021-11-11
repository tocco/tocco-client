export default {
  fixLabel: () => true,
  getOptions: ({formField, formData}) => ({
    mode: formField.mode,
    loadModel: formData.loadModel
  })
}
