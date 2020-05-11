
export default {
  getOptions: ({modelField, formData}) => ({
    linkFactory: formData.linkFactory && formData.linkFactory.detail
      ? (key, content) => formData.linkFactory.detail(modelField.targetEntity, modelField.relationName, key, content)
      : null
  })

}
