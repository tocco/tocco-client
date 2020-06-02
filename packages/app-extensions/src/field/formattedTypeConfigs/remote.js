
export default {
  getOptions: ({modelField, formField, formData}) => ({
    linkFactory: formData.linkFactory && formData.linkFactory.detail
      ? (key, content) => formData.linkFactory.detail(formField.targetEntity, modelField.relationName, key, content)
      : null
  })

}
