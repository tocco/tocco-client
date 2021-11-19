import React from 'react'
import {components} from 'react-select'
import PropTypes from 'prop-types'

import Ball from '../Ball'
import {StyledIndicatorsContainerWrapper} from './StyledComponents'

const handleAdvancedSearch = (openAdvancedSearch, value) => e => {
  openAdvancedSearch(value)
  e.stopPropagation()
}

const handleCreate = (openCreate, value) => e => {
  openCreate(value)
  e.stopPropagation()
}

const handlePropagation = e => {
  e.stopPropagation()
}

const IndicatorsContainer = props => {
  const {
    openAdvancedSearch,
    openRemoteCreate,
    isDisabled,
    createPermission,
    value,
    isMulti,
    wrapperHeight
  } = props.selectProps
  const rowHeight = 30 // roughly the height of a single row in px
  const isBottomAligned = isMulti && value?.length && wrapperHeight > rowHeight

  return (
    <StyledIndicatorsContainerWrapper isBottomAligned={isBottomAligned}>
      <components.IndicatorsContainer {...props}>
        {props.children}
        {openAdvancedSearch
        && !isDisabled
        && <span
          onTouchEnd={handlePropagation}
          onMouseDown={handlePropagation}
          onMouseUp={handleAdvancedSearch(openAdvancedSearch, props.value)}>
        <Ball
          icon="search"
          tabIndex={-1}
        />
      </span>}
        {createPermission
        && !isDisabled
        && <span
          onTouchEnd={handlePropagation}
          onMouseDown={handlePropagation}
          onMouseUp={handleCreate(openRemoteCreate, value)}>
        <Ball
          icon="plus"
          tabIndex={-1}
        />
      </span>}
      </components.IndicatorsContainer>
    </StyledIndicatorsContainerWrapper>
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
  selectProps: PropTypes.shape({
    openAdvancedSearch: PropTypes.func,
    openRemoteCreate: PropTypes.func,
    isDisabled: PropTypes.bool,
    isMulti: PropTypes.bool,
    wrapperHeight: PropTypes.number,
    createPermission: PropTypes.bool,
    value: PropTypes.oneOfType([
      ItemPropType,
      PropTypes.arrayOf(ItemPropType)
    ])
  }),
  value: PropTypes.oneOfType([
    ItemPropType,
    PropTypes.arrayOf(ItemPropType)
  ])
}

export default IndicatorsContainer
