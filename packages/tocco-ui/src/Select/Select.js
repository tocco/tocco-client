import PropTypes from 'prop-types'
import React from 'react'
import ReactSelect from 'react-select'
import _debounce from 'lodash/debounce'
import _isEqual from 'lodash/isEqual'
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

/**
 * To select between multiple options. Loading of options and so on are remotely controlled.
 */
export class Select extends React.Component {
  SEARCH_DEBOUNCE = 300

  constructor(props) {
    super(props)
    this.selectComponent = React.createRef()
    this.selectWrapper = React.createRef()
    this.state = {isOpen: false}
  }

  getOptions = () => [...(this.props.options || [])]

  focus = () => {
    this.selectComponent.current.focus()
  }

  resize = () => {
    this.forceUpdate()
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize)
  }

  onInputChange = searchTerm => {
    if (this.props.searchOptions && searchTerm) {
      this.debouncedSearchOptions(searchTerm)
    }
  }

  shouldComponentUpdate = (nextProps, nextState) =>
    !_isEqual(this.props, nextProps) || !_isEqual(this.state, nextState)

  onMenuOpen = () => {
    this.setState({isOpen: true})
    if (this.props.fetchOptions && !this.state.isOpen) { this.props.fetchOptions() }
  }

  debouncedSearchOptions =
    this.props.searchOptions ? _debounce(this.props.searchOptions, this.SEARCH_DEBOUNCE) : () => {}

  render() {
    const wrapperWidth = this.selectWrapper.current ? this.selectWrapper.current.clientWidth : 300
    const wrapperHeight = this.selectWrapper.current ? this.selectWrapper.current.clientHeight : 35

    const CustomMenu = props => <Menu {...props} wrapperWidth={wrapperWidth} wrapperHeight={wrapperHeight}/>
    const CustomSingleValue = props =>
      <SingleValue
        {...props}
        loadTooltip={this.props.loadTooltip}
        tooltips={this.props.tooltips}/>

    const CustomMultiValueLabel = props =>
      <MultiValueLabel
        {...props}
        loadTooltip={this.props.loadTooltip}
        tooltips={this.props.tooltips}
      />

    return (
      <div
        tabIndex="-1"
        id={this.props.id}
        onFocus={this.focus}
        style={{
          outlineStyle: 'none',
          cursor: this.props.immutable ? 'not-allowed' : 'default'
        }}>
        <div ref={this.selectWrapper} style={{outlineStyle: 'none'}}>
          <ReactSelect
            getOptionLabel={option => option.display}
            getOptionValue={option => option.key}
            components={{
              ClearIndicator: ClearIndicator,
              DropdownIndicator: props =>
                <DropdownIndicator
                  immutable={this.props.immutable}
                  isOpen={this.state.isOpen}
                  openMenu={this.onMenuOpen}
                  {...props}
                />,
              LoadingIndicator: LoadingIndicator,
              IndicatorsContainer: props =>
                <IndicatorsContainer
                  openAdvancedSearch = {this.props.openAdvancedSearch}
                  immutable = {this.props.immutable}
                  value = {this.props.value}
                  {...props}
                />,
              IndicatorSeparator: null,
              Menu: CustomMenu,
              MenuList: props =>
                <MenuList
                  moreOptionsAvailable = {this.props.moreOptionsAvailable}
                  moreOptionsAvailableText = {this.props.moreOptionsAvailableText}
                  {...props}
                />,
              MultiValueLabel: CustomMultiValueLabel,
              SingleValue: CustomSingleValue
            }}
            noOptionsMessage={() => (this.props.noResultsText || ' - ')}
            isMulti={this.props.isMulti}
            closeMenuOnSelect={!this.props.isMulti}
            isSearchable
            {...(this.props.searchOptions ? {filterOption: () => (true)} : {})}
            isClearable
            loadingMessage={() => null}
            placeholder=""
            menuShouldScrollIntoView={false}
            autoFocus={false}
            value={this.props.value}
            onChange={this.props.onChange}
            onInputChange={this.onInputChange}
            options={this.getOptions()}
            isLoading={this.props.isLoading}
            isDisabled={this.props.immutable}
            ref={this.selectComponent}
            onMenuClose={() => this.setState({isOpen: false})}
            onMenuOpen={this.onMenuOpen}
            styles={reactSelectStyles(this.props.theme)}
            theme={theme => reactSelectTheme(theme, this.props.theme)}
            openMenuOnClick={this.props.openMenuOnClick || false}
            menuIsOpen={this.state.isOpen}
          />
        </div>
      </div>
    )
  }
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
