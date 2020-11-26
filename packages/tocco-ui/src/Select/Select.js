import PropTypes from 'prop-types'
import React, {useRef} from 'react'
import ReactSelect from 'react-select'
import _debounce from 'lodash/debounce'
import {withTheme} from 'styled-components'

import ClearIndicator from './ClearIndicator'
import DropdownIndicator from './DropdownIndicator'
import IndicatorsContainer from './IndicatorsContainer'
import LoadingIndicator from './LoadingIndicator'
import Menu from './Menu'
import MenuList from './MenuList'
import MultiValueLabel from './MultiValueLabel'
import SingleValue from './SingleValue'
import {reactSelectStyles, reactSelectTheme} from './StyledReactSelect'

const SEARCH_DEBOUNCE = 300

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
  valueLinkFactory
}) => {
  const selectComponent = useRef(null)
  const selectWrapper = useRef(null)

  const getOptions = () => [...(options || [])]

  const handleInputChange = searchTerm => {
    if (searchOptions && searchTerm) {
      debouncedSearchOptions(searchTerm)
    }
  }

  const handleMenuOpen = () => {
    if (fetchOptions) {
      fetchOptions()
    }
  }

  const debouncedSearchOptions
    = searchOptions ? _debounce(searchOptions, SEARCH_DEBOUNCE) : () => {}

  const wrapperWidth = selectWrapper.current ? selectWrapper.current.clientWidth : 300
  const wrapperHeight = selectWrapper.current ? selectWrapper.current.clientHeight : 35

  const CustomMenu = propsCustoMenu =>
    <Menu {...propsCustoMenu} wrapperWidth={wrapperWidth} wrapperHeight={wrapperHeight}/>

  return (
    <div
      tabIndex="-1"
      id={id}
      style={{
        outlineStyle: 'none',
        cursor: immutable ? 'not-allowed' : 'default'
      }}>
      <div ref={selectWrapper} style={{outlineStyle: 'none'}}>
        <ReactSelect
          getOptionLabel={option => option.display}
          getOptionValue={option => option.key}
          components={{
            ClearIndicator,
            LoadingIndicator,
            DropdownIndicator: DropdownIndicator,
            IndicatorsContainer: IndicatorsContainer,
            IndicatorSeparator: null,
            Menu: CustomMenu,
            MenuList: MenuList,
            MultiValueLabel,
            SingleValue
          }}
          noOptionsMessage={() => (noResultsText || ' - ')}
          isMulti={isMulti}
          closeMenuOnSelect={!isMulti}
          isSearchable
          {...(searchOptions ? {filterOption: () => (true)} : {})}
          isClearable
          loadingMessage={() => null}
          placeholder=""
          menuShouldScrollIntoView={false}
          autoFocus={false}
          value={value || null}
          onChange={onChange}
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
          valueLinkFactory={valueLinkFactory}
          openAdvancedSearch={openAdvancedSearch}
          moreOptionsAvailable={moreOptionsAvailable}
          moreOptionsAvailableText={moreOptionsAvailableText}
          blurInputOnSelect={false}
        />
      </div>
    </div>
  )
}

const ItemPropType = PropTypes.shape({
  key: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  display: PropTypes.string
})

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
  value: PropTypes.oneOfType([
    ItemPropType,
    PropTypes.arrayOf(ItemPropType)
  ]),
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
   * Function that can wrap the value. This allows to render a <Link> around the value label for navigation purposes.
   * First parameter is the key of the value, the second parameter is the value node itself.
   *
   * e.g.
   * (key, children) => <a href={`/${key}`} target="_blank" rel="noopener noreferrer">{children}</a>
   */
  valueLinkFactory: PropTypes.func,
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
   * Id of outter element
   */
  id: PropTypes.string,
  /**
   * Open menu with click on input field
   */
  openMenuOnClick: PropTypes.bool
}

export default withTheme(Select)
