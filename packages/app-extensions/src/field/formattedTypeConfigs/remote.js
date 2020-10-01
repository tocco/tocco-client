
export default {
  getOptions: ({formField, formData}) => ({
    linkFactory: formData.linkFactory && formData.linkFactory.detail
      ? (key, content) => formData.linkFactory.detail(formField.targetEntity, formField.relationName, key, content)
      : null
  })

}
