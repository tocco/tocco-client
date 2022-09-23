import _throttle from 'lodash/throttle'
import PropTypes from 'prop-types'
import {useRef, useState, useCallback} from 'react'
import ReactSelect from 'react-select'
import {withTheme} from 'styled-components'

import ClearIndicator from './ClearIndicator'
import DropdownIndicator from './DropdownIndicator'
import IndicatorsContainer from './IndicatorsContainer'
import ItemPropType from './ItemPropType'
import LoadingIndicator from './LoadingIndicator'
import Menu from './Menu'
import MenuList from './MenuList'
import MultiValueLabel from './MultiValueLabel'
import SingleValue from './SingleValue'
import {
  reactSelectStyles,
  reactSelectTheme,
  StyledReactSelectOuterWrapper,
  StyledReactSelectInnerWrapper
} from './StyledComponents'
import ValueContainer from './ValueContainer'

/**
 * To select between multiple options. Loading of options and so on are remotely controlled.
 */
const Select = ({
  fetchOptions,
  id,
  immutable,
  isLoading,
  isMulti,
  loadTooltip,
  moreOptionsAvailable,
  moreOptionsAvailableText,
  noResultsText,
  onChange,
  openAdvancedSearch,
  options,
  searchOptions,
  theme,
  tooltips,
  value,
  DetailLink,
  createPermission,
  openRemoteCreate
}) => {
  const selectComponent = useRef(null)
  const selectWrapper = useRef(null)
  const getWrapperWidth = () => selectWrapper.current?.clientWidth || 300
  const getWrapperHeight = () => selectWrapper.current?.clientHeight || 35
  const [wrapperWidth, setWrapperWidth] = useState(getWrapperWidth())
  const [wrapperHeight, setWrapperHeight] = useState(getWrapperHeight())

  const getOptions = () => [...(options || [])]

  const invokeFetchOptions = currentValue => {
    if (fetchOptions) {
      fetchOptions(currentValue)
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const searchFunction = useCallback(
    searchOptions ||
      (() => {
        /* _throttle expects a function */
      }),
    []
  )

  // _throttle is not working with inline function
  // searchOptions shouldn't be included in deps array as _throttle only needs to be run initially
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const throttledSearchFunction = useCallback(_throttle(searchFunction, 800, {trailing: true}), [])

  const handleInputChange = (searchTerm, event) => {
    const {action} = event

    if (searchOptions && searchTerm) {
      throttledSearchFunction(searchTerm, value)
    }
    if (searchTerm === '' && action === 'input-change') {
      invokeFetchOptions(value)
    }
  }

  const handleMenuOpen = () => {
    invokeFetchOptions(value)
  }

  const handleOnChange = newValue => {
    onChange(newValue)
    invokeFetchOptions(newValue)
  }

  const handleFocus = () => {
    selectComponent.current.focus()
    // The timeout method ensures that the function
    // call happens at the end of the call stack
    // after the container has fully rendered.
    // Otherwise misscalculations of dimensions can occur.
    setTimeout(() => {
      setWrapperWidth(getWrapperWidth())
      setWrapperHeight(getWrapperHeight())
    }, 0)
  }

  const handleScroll = e => !e.target.classList?.contains('MenuList')
  const hasAdvancedSearch = Boolean(openAdvancedSearch)
  const hasCreatePermission = Boolean(createPermission)

  return (
    <StyledReactSelectOuterWrapper tabIndex="-1" id={id} onFocus={handleFocus}>
      <StyledReactSelectInnerWrapper ref={selectWrapper}>
        <ReactSelect
          getOptionLabel={option => option.display}
          getOptionValue={option => option.key}
          wrapperWidth={wrapperWidth}
          wrapperHeight={wrapperHeight}
          components={{
            ClearIndicator,
            LoadingIndicator,
            DropdownIndicator,
            IndicatorsContainer,
            IndicatorSeparator: null,
            Menu,
            MenuList,
            MultiValueLabel,
            SingleValue,
            ValueContainer
          }}
          noOptionsMessage={() => noResultsText || ' - '}
          isMulti={isMulti}
          closeMenuOnSelect={!isMulti}
          isSearchable
          {...(searchOptions ? {filterOption: () => true} : {})}
          isClearable
          loadingMessage={() => null}
          placeholder=""
          menuShouldScrollIntoView={false}
          autoFocus={false}
          value={value || null}
          onChange={handleOnChange}
          onInputChange={handleInputChange}
          options={getOptions()}
          isLoading={isLoading}
          isDisabled={immutable}
          ref={selectComponent}
          onMenuOpen={handleMenuOpen}
          styles={reactSelectStyles(theme)}
          theme={themeSelect => reactSelectTheme(themeSelect, theme)}
          loadTooltip={loadTooltip}
          tooltips={tooltips}
          DetailLink={DetailLink}
          hasAdvancedSearch={hasAdvancedSearch}
          openAdvancedSearch={openAdvancedSearch}
          moreOptionsAvailable={moreOptionsAvailable}
          moreOptionsAvailableText={moreOptionsAvailableText}
          blurInputOnSelect={false}
          hasCreatePermission={hasCreatePermission}
          createPermission={createPermission}
          openRemoteCreate={openRemoteCreate}
          closeMenuOnScroll={handleScroll}
        />
      </StyledReactSelectInnerWrapper>
    </StyledReactSelectOuterWrapper>
  )
}

Select.propTypes = {
  /**
   * If one more multiple values can be selected
   */
  isMulti: PropTypes.bool,
  /**
   * Callback function on change event. Passes the new value as first parameter.
   */
  onChange: PropTypes.func,
  /**
   * Expects an array or single object containing a display and key attribute.
   */
  value: PropTypes.oneOfType([ItemPropType, PropTypes.arrayOf(ItemPropType)]),
  /**
   * Possible options that the user can select
   */
  options: PropTypes.arrayOf(ItemPropType),
  /**
   * Callback to load options (is invoked on focus)
   */
  fetchOptions: PropTypes.func,
  /**
   * Callback to load options if the user types into to select. The search value is passed as first parameter.
   */
  searchOptions: PropTypes.func,
  /**
   * Can be set to true while loading the options. Shows a loading indicator.
   */
  isLoading: PropTypes.bool,
  /**
   * Wil be displayed if no options are left to choose from.
   */
  noResultsText: PropTypes.string,
  /**
   * If true, a disabled option is appended that says that not all options are shown.
   */
  moreOptionsAvailable: PropTypes.bool,
  /**
   * Text that is shown if moreOptionsAvailable is true.
   */
  moreOptionsAvailableText: PropTypes.string,
  /**
   * If defined a button is shown next to the select box that invokes this callback.
   */
  openAdvancedSearch: PropTypes.func,
  /**
   * Component that allows to render a <Link> around the value label for navigation purposes.
   * First parameter is the key of the value, the second parameter is the value node itself / child.
   *
   * e.g.
   * ({entityKey, children}) => <a href={`/${key}`} target="_blank" rel="noopener noreferrer">{children}</a>
   */
  DetailLink: PropTypes.func,
  /**
   * Theme provided by styled-components ThemeProvider.
   */
  theme: PropTypes.object,
  /**
   * Object containing tooltips with the key as attribute name.
   */
  tooltips: PropTypes.objectOf(PropTypes.string),
  /**
   * Callback to enhance tooltip object with new tooltips.
   */
  loadTooltip: PropTypes.func,
  /**
   * Whether the user can edit the value or not.
   */
  immutable: PropTypes.bool,
  /**
   * Id of outer element
   */
  id: PropTypes.string,
  /**
   * Open menu with click on input field
   */
  openMenuOnClick: PropTypes.bool,
  /**
   * Whether a new option may be created
   */
  createPermission: PropTypes.bool,
  /**
   * Opens a modal with a create form
   */
  openRemoteCreate: PropTypes.func
}

export default withTheme(Select)
