import React from 'react'
import {components} from 'react-select'

import Button from '../Button'

const IndicatorsContainer = props => {
  const {
    children,
    openAdvancedSearch,
    readOnly,
    value,
    ...restProps
  } = props

  return (
    <components.IndicatorsContainer {...restProps}>
      {children}
      {openAdvancedSearch
      && <span
        onTouchEnd={e => e.stopPropagation()}
        onMouseDown={e => e.stopPropagation()}>
        <Button
          disabled={readOnly || !openAdvancedSearch}
          icon="search"
          onClick={() => openAdvancedSearch(value)}
        />
      </span>}
    </components.IndicatorsContainer>
  )
}

export default IndicatorsContainer
