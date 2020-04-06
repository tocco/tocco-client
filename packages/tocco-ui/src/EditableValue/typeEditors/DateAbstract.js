import React from 'react'
import PropTypes from 'prop-types'
import {injectIntl, intlShape} from 'react-intl'
import _isEqual from 'lodash/isEqual'
import {withTheme} from 'styled-components'
import {js} from 'tocco-util'

import {theme} from '../../utilStyles'
import Ball from '../../Ball'
import {
  StyledDateAbstractControl,
  StyledDateAbstractInput,
  StyledDateAbstractWrapper
} from './StyledDateAbstract'

class DateAbstract extends React.Component {
  Flatpickr = null
  componentIsUnmounted = false

  constructor(props) {
    super(props)
    this.wrapper = React.createRef()

    this.state = {altInput: ''}

    import(/* webpackChunkName: "flatpickr" */ '!style-loader!css-loader!flatpickr/dist/themes/light.css')

    Promise.all([
      import(/* webpackChunkName: "flatpickr" */ 'flatpickr'),
      import(/* webpackChunkName: "flatpickr" */ 'flatpickr/dist/l10n/de.js'),
      import(/* webpackChunkName: "flatpickr" */ 'flatpickr/dist/l10n/fr.js'),
      import(/* webpackChunkName: "flatpickr" */ 'flatpickr/dist/l10n/it.js')
    ]).then(response => {
      if (!this.componentIsUnmounted) {
        this.Flatpickr = response[0].default
        this.localeMap = {
          'de-CH': response[1].German,
          'de': response[1].German,
          'fr': response[2].French,
          'it': response[3].Italian
        }

        this.initializeFlatPickr()
      }
    })
  }

  initializeFlatPickr = flatpickr => {
    const locale = this.localeMap[this.props.intl.locale]

    this.options = {
      wrap: true,
      onChange: this.handleOnChange,
      altInput: true,
      altInputClass: '',
      clickOpens: !this.props.immutable,
      defaultDate: this.props.value,
      ...(locale ? {locale} : {}),
      ...(this.props.options ? this.props.options.flatpickrOptions : {})
    }

    this.flatpickr = new this.Flatpickr(this.wrapper.current, this.options)
    this.flatpickr.calendarContainer.classList.add('tocco-ui-theme')
    this.flatpickr.calendarContainer.style.fontFamily = theme.fontFamily('regular')(this.props)

    if (this.props.initialized) {
      this.props.initialized()
    }
    this.setState({altInput: this.flatpickr.altInput.value})
  }

  getLocale = localeCode => {
    if (this.localeMap) {
      let locale = this.localeMap[localeCode]

      // Fallback english
      if (!locale && this.Flatpickr) {
        locale = this.Flatpickr.l10ns.en
      }
      return locale
    }
    return null
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.Flatpickr && this.flatpickr) {
      const optionsDiff = js.difference(this.props.options.flatpickrOptions, prevProps.options.flatpickrOptions)
      if (Object.keys(optionsDiff).length > 0) {
        Object.entries(optionsDiff).forEach(([key, value]) => {
          this.flatpickr.set(key, value)
        })
        this.flatpickr.redraw()
      }

      if (!_isEqual(prevProps.intl.locale, this.props.intl.locale)) {
        const locale = this.getLocale(this.props.intl.locale)
        this.Flatpickr.localize(locale)
        this.flatpickr.set('locale', locale)
        this.flatpickr.redraw()
      }
      if (!_isEqual(prevProps.value, this.props.value)) {
        this.flatpickr.setDate(this.props.value, false)
        this.flatpickr.redraw()
      }
    }
  }

  componentWillUnmount() {
    this.componentIsUnmounted = true
    if (this.flatpickr) {
      this.flatpickr.destroy()
    }
  }

  handleOnChange = selectedDates => {
    const isoStrings = selectedDates.map(date => date.toISOString())
    this.setState({altInput: this.flatpickr.altInput.value})
    if (!(!this.hasValue() && isoStrings.length === 0)) {
      this.props.onChange(isoStrings)
    }
  }

  hasValue = () => {
    return this.props.value && this.props.value.length > 0 && this.props.value.every(v => v)
  }

  handleOnBlur = () => {
    if (this.props.onBlur) {
      const altValue = this.flatpickr.altInput.value
      this.props.onBlur(altValue, this.flatpickr.selectedDates, r => this.flatpickr.setDate(r, true))
    }
  }

  render() {
    return (
      <StyledDateAbstractWrapper
        data-wrap
        onBlur={this.handleOnBlur}
        immutable={this.props.immutable}
        ref={this.wrapper}
        id={this.props.id}
      >
        <StyledDateAbstractInput
          type="text"
          data-input
          immutable={this.props.immutable}
          {...(this.props.options ? {placeholder: this.props.options.placeholderText} : {})}
        />
        <StyledDateAbstractInput
          disabled
          immutable={this.props.immutable}
          value={this.state.altInput}
        />
        <StyledDateAbstractControl
          data-clear
          hideButton={!this.hasValue() || this.props.immutable}
        >
          <Ball
            icon="times"
            tabIndex={-1}
          />
        </StyledDateAbstractControl>
      </StyledDateAbstractWrapper>
    )
  }
}

DateAbstract.propTypes = {
  id: PropTypes.string,
  intl: intlShape.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.arrayOf(PropTypes.string),
  options: PropTypes.shape({
    placeholderText: PropTypes.string,
    flatpickrOptions: PropTypes.object
  }),
  immutable: PropTypes.bool,
  initialized: PropTypes.func,
  events: PropTypes.shape({
    onFocus: PropTypes.func
  })
}

export default withTheme(injectIntl(DateAbstract))
