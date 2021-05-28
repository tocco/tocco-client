import React from 'react'
import {components} from 'react-select'
import PropTypes from 'prop-types'

import Ball from '../Ball'
import {StyledIndicatorsContainerWrapper} from './StyledComponents'

const handleMouseUp = (openAdvancedSearch, value) => event => {
  openAdvancedSearch(value)
  event.stopPropagation()
}

const IndicatorsContainer = props => {
  const {openAdvancedSearch, isDisabled} = props.selectProps

  return (
    <StyledIndicatorsContainerWrapper>
      <components.IndicatorsContainer {...props}>
        {props.children}
        {openAdvancedSearch
      && !isDisabled
      && <span
        onTouchEnd={e => e.stopPropagation()}
        onMouseDown={e => e.stopPropagation()}
        onMouseUp={handleMouseUp(openAdvancedSearch, props.value)}>
        <Ball
          icon="search"
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
    isDisabled: PropTypes.bool
  }),
  value: PropTypes.oneOfType([
    ItemPropType,
    PropTypes.arrayOf(ItemPropType)
  ])
}

export default IndicatorsContainer
