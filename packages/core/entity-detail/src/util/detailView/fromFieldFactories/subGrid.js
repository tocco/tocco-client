import React from 'react'

import SubGridContainer from '../../../containers/SubGridContainer'

export default (formField, key) => (
  <SubGridContainer
    key={key}
    formField={formField}
    showSearchForm={formField.showSearchForm}
    limit={formField.limit || undefined}
  />
)
