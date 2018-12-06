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
      && !readOnly
      && <span
        onTouchEnd={e => e.stopPropagation()}
        onMouseDown={e => e.stopPropagation()}>
        <Button
          disabled={!openAdvancedSearch}
          icon="search"
          look="ball"
          onClick={() => openAdvancedSearch(value)}
        />
      </span>}
    </components.IndicatorsContainer>
  )
}

export default IndicatorsContainer
