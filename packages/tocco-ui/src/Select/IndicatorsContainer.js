import React from 'react'
import {components} from 'react-select'

import Button from '../Button'

const handleMouseUp = (openAdvancedSearch, value) => event => {
  openAdvancedSearch(value)
  event.stopPropagation()
}

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
        onMouseDown={e => e.stopPropagation()}
        onMouseUp={handleMouseUp(openAdvancedSearch, value)}>
        <Button
          icon="search"
          look="ball"
        />
      </span>}
    </components.IndicatorsContainer>
  )
}

export default IndicatorsContainer
