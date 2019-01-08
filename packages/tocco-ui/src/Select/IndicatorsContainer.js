import React from 'react'
import {components} from 'react-select'
import PropTypes from 'prop-types'

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

const ItemPropType = PropTypes.shape({
  key: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  display: PropTypes.string
})

IndicatorsContainer.propTypes = {
  children: PropTypes.node,
  openAdvancedSearch: PropTypes.func,
  readOnly: PropTypes.bool,
  value: PropTypes.oneOfType([
    ItemPropType,
    PropTypes.arrayOf(ItemPropType)
  ])
}

export default IndicatorsContainer
