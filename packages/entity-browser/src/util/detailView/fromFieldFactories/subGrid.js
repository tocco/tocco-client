import React from 'react'
import SubGridContainer from '../../../routes/detail/containers/SubGridContainer'

export default type =>
  (formField, modelField, props, events, utils) => (
    <SubGridContainer
      {...props}
      tableDefinition={formField}
      relationName={formField.name}
      modelField={modelField}
    />
  )
