const buildImplicitModelInfo = (implicitModelEntity, field) => {
  return {
    entityModel: implicitModelEntity.model,
    key: implicitModelEntity.key,
    field
  }
}

const findImplicitModelFromRelation = (modelField, pathStepIndex, formData) => {
  const relation = modelField.substring(0, pathStepIndex)
  const field = modelField.substring(pathStepIndex + 1)
  const implicitModelEntity = formData.formValues[relation]
  if (implicitModelEntity) {
    if (Array.isArray(implicitModelEntity)) {
      if (implicitModelEntity.length === 1) {
        return buildImplicitModelInfo(implicitModelEntity[0], field)
      }
    } else {
      return buildImplicitModelInfo(implicitModelEntity, field)
    }
  }
  return null
}

const findImplicitModel = (formField, formData) => {
  if (formField.implicitModelField && formData.formValues) {
    const modelField = formField.implicitModelField
    const pathStepIndex = modelField.indexOf('.')
    if (pathStepIndex) {
      return findImplicitModelFromRelation(modelField, pathStepIndex, formData)
    } else {
      return formData.formValues[modelField]
    }
  } else {
    return formField.implicitModel
  }
}

const findImplicitModelField = formField => {
  if (formField.implicitModelField) {
    const modelField = formField.implicitModelField
    const pathStepIndex = modelField.indexOf('.')
    if (pathStepIndex) {
      return [modelField.substring(0, pathStepIndex)]
    } else {
      return [modelField]
    }
  } else {
    return []
  }
}

export default {
  fixLabel: () => true,
  getOptions: ({formField, formData}) => ({
    mode: formField.mode,
    implicitModel: findImplicitModel(formField, formData)
  }),
  dataContainerProps: ({
    formField,
    formName
  }) => ({
    formValues: {
      formName: formName,
      fields: findImplicitModelField(formField)
    }
  })
}
