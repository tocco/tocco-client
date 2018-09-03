import React from 'react'

import SubGridContainer from '../../../containers/SubGridContainer'

export default type =>
  (formField, modelField, key) => (
    <SubGridContainer
      key={key}
      gridName={formField.id}
      relationName={formField.id}
      modelField={modelField}
      showSearchForm={formField.showSearchForm}
      limit={formField.limit || undefined}
    />
  )
