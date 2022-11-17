import PropTypes from 'prop-types'
import {components} from 'react-select'

import Ball from '../Ball'
import ItemPropType from './ItemPropType'
import {StyledIndicatorsContainerWrapper} from './StyledComponents'

const handleAdvancedSearch = (openAdvancedSearch, searchTerm, value) => e => {
  e.stopPropagation()
  openAdvancedSearch(searchTerm, value)
}

const handleDocsTreeSearch = (openDocsTreeSearch, value) => e => {
  e.stopPropagation()
  openDocsTreeSearch(value)
}

const handleCreate = (openCreate, value) => e => {
  e.stopPropagation()
  openCreate(value)
}

const handlePropagation = e => {
  e.stopPropagation()
}

const IndicatorsContainer = props => {
  const {
    openDocsTreeSearch,
    openAdvancedSearch,
    openRemoteCreate,
    isDisabled,
    hasDocsTreeSearch,
    hasAdvancedSearch,
    createPermission,
    value,
    isMulti,
    inputValue
  } = props.selectProps

  const showInputAlwaysOnTop = isMulti && (hasAdvancedSearch || hasDocsTreeSearch)

  /**
   * Workaround: `onMouseDown` vs. `onClick` handler
   *
   * 1. Usage of `inputValue`
   *  Use `onMouseDown` to invoke the handler function before
   *  the input get blurred and `inputValue` has been reset.
   *
   * 2. Prevent options menu to be toggled
   *  When clicking on the search or create button the options menu will be toggled as well.
   *  In order to prevent toggling the menu the event bubbling as to be stopped.
   *  Since react-select is using `onMouseDown` by itself the event has to be stopped inside the `onMouseDown` event.
   */
  return (
    <StyledIndicatorsContainerWrapper isTopAligned={showInputAlwaysOnTop}>
      <components.IndicatorsContainer {...props}>
        {props.children}
        {openDocsTreeSearch && !isDisabled && (
          <span onTouchEnd={handlePropagation} onMouseDown={handleDocsTreeSearch(openDocsTreeSearch, value)}>
            <Ball icon="folder" tabIndex={-1} />
          </span>
        )}
        {openAdvancedSearch && !isDisabled && (
          <span
            onTouchEnd={handlePropagation}
            onMouseDown={handleAdvancedSearch(openAdvancedSearch, inputValue, value)}
          >
            <Ball icon="search" tabIndex={-1} />
          </span>
        )}
        {createPermission && !isDisabled && (
          <span onTouchEnd={handlePropagation} onMouseDown={handleCreate(openRemoteCreate, value)}>
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
    hasDocsTreeSearch: PropTypes.bool,
    openDocsTreeSearch: PropTypes.func,
    hasAdvancedSearch: PropTypes.bool,
    openAdvancedSearch: PropTypes.func,
    openRemoteCreate: PropTypes.func,
    isDisabled: PropTypes.bool,
    isMulti: PropTypes.bool,
    createPermission: PropTypes.bool,
    value: PropTypes.oneOfType([ItemPropType, PropTypes.arrayOf(ItemPropType)]),
    inputValue: PropTypes.string
  }),
  value: PropTypes.oneOfType([ItemPropType, PropTypes.arrayOf(ItemPropType)])
}

export default IndicatorsContainer
