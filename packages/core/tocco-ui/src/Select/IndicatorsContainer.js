import PropTypes from 'prop-types'
import {components} from 'react-select'

import Ball from '../Ball'
import ItemPropType from './ItemPropType'
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
  const {openAdvancedSearch, openRemoteCreate, isDisabled, createPermission, value, isMulti} = props.selectProps

  return (
    <StyledIndicatorsContainerWrapper isTopAligned={isMulti}>
      <components.IndicatorsContainer {...props}>
        {props.children}
        {openAdvancedSearch && !isDisabled && (
          <span
            onTouchEnd={handlePropagation}
            onMouseDown={handlePropagation}
            onMouseUp={handleAdvancedSearch(openAdvancedSearch, value)}
          >
            <Ball icon="search" tabIndex={-1} />
          </span>
        )}
        {createPermission && !isDisabled && (
          <span
            onTouchEnd={handlePropagation}
            onMouseDown={handlePropagation}
            onMouseUp={handleCreate(openRemoteCreate, value)}
          >
            <Ball icon="plus" tabIndex={-1} />
          </span>
        )}
      </components.IndicatorsContainer>
    </StyledIndicatorsContainerWrapper>
  )
}

IndicatorsContainer.propTypes = {
  children: PropTypes.node,
  selectProps: PropTypes.shape({
    hasAdvancedSearch: PropTypes.bool,
    openAdvancedSearch: PropTypes.func,
    openRemoteCreate: PropTypes.func,
    isDisabled: PropTypes.bool,
    isMulti: PropTypes.bool,
    createPermission: PropTypes.bool,
    value: PropTypes.oneOfType([ItemPropType, PropTypes.arrayOf(ItemPropType)])
  }),
  value: PropTypes.oneOfType([ItemPropType, PropTypes.arrayOf(ItemPropType)])
}

export default IndicatorsContainer
