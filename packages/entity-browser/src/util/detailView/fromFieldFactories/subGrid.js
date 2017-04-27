import React from 'react'
import SubGridContainer from '../../../routes/detail/containers/SubGridContainer'

export default type =>
  (formField, modelField, props, events, utils) => (
    <SubGridContainer
      {...props}
      formDefinition={{children: formField.children}}
      relationName={formField.name}
      modelField={modelField}
    />
  )
