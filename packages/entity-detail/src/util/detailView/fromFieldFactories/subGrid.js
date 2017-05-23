import React from 'react'
import SubGridContainer from '../../../containers/SubGridContainer'

export default type =>
  (formField, modelField, props, events, utils) => (
    <SubGridContainer
      {...props}
      gridName={formField.name}
      relationName={formField.name}
      modelField={modelField}
    />
  )
