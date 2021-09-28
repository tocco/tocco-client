import React from 'react'
import {components} from 'react-select'
import PropTypes from 'prop-types'

import Ball from '../Ball'
import {StyledIndicatorsContainerWrapper} from './StyledComponents'

const handleAdvancedSearch = (openAdvancedSearch, value) => event => {
  openAdvancedSearch(value)
  event.stopPropagation()
}

const handleCreate = openCreate => event => {
  openCreate()
  event.stopPropagation()
}

const IndicatorsContainer = props => {
  const {openAdvancedSearch, openRemoteCreate, isDisabled, createPermission} = props.selectProps

  return (
    <StyledIndicatorsContainerWrapper>
      <components.IndicatorsContainer {...props}>
        {props.children}
        {openAdvancedSearch
      && !isDisabled
      && <span
        onTouchEnd={e => e.stopPropagation()}
        onMouseDown={e => e.stopPropagation()}
        onMouseUp={handleAdvancedSearch(openAdvancedSearch, props.value)}>
        <Ball
          icon="search"
          tabIndex={-1}
        />
      </span>}
        {createPermission
        && !isDisabled
        && <span
          onTouchEnd={e => e.stopPropagation()}
          onMouseDown={e => e.stopPropagation()}
          onMouseUp={handleCreate(openRemoteCreate)}>
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
    createPermission: PropTypes.bool
  }),
  value: PropTypes.oneOfType([
    ItemPropType,
    PropTypes.arrayOf(ItemPropType)
  ])
}

export default IndicatorsContainer
