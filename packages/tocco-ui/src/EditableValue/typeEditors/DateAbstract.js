import React from 'react'
import PropTypes from 'prop-types'
import {injectIntl, intlShape} from 'react-intl'
import classNames from 'classnames'

import Icon from '../../Icon'

class DateAbstract extends React.Component {
  Flatpickr = null

  constructor(props) {
    super(props)
    this.wrapper = React.createRef()

    import(/* webpackChunkName: "flatpickr" */ '!style-loader!css-loader!flatpickr/dist/themes/light.css')

    Promise.all([
      import(/* webpackChunkName: "flatpickr" */ 'flatpickr'),
      import(/* webpackChunkName: "flatpickr" */ 'flatpickr/dist/l10n/de.js'),
      import(/* webpackChunkName: "flatpickr" */ 'flatpickr/dist/l10n/fr.js'),
      import(/* webpackChunkName: "flatpickr" */ 'flatpickr/dist/l10n/it.js')
    ]).then(response => {
      this.Flatpickr = response[0].default
      this.localeMap = {
        'de-CH': response[1].German,
        'de': response[1].German,
        'fr': response[2].French,
        'it': response[3].Italian
      }

      this.initializeFlatPickr()
    })
  }

  initializeFlatPickr = flatpickr => {
    const locale = this.localeMap[this.props.intl.locale]

    this.options = {
      wrap: true,
      onChange: this.handleOnChange.bind(this),
      altInput: true,
      clickOpens: !this.props.readOnly,
      defaultDate: this.props.value,
      ...(locale ? {locale} : {}),
      ...(this.props.options ? this.props.options.flatpickrOptions : {})
    }

    this.flatpickr = new this.Flatpickr(this.wrapper.current, this.options)
    this.flatpickr.calendarContainer.classList.add('tocco-ui-theme')

    if (this.props.initialized) {
      this.props.initialized()
    }
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

  componentDidUpdate(prevProps) {
    if (this.Flatpickr && this.flatpickr) {
      if (prevProps.intl.locale !== this.props.intl.locale) {
        const locale = this.getLocale(this.props.intl.locale)
        this.Flatpickr.localize(locale)
        this.flatpickr.set('locale', locale)
      }

      if (prevProps.options.flatpickrOptions.altFormat !== this.props.options.flatpickrOptions.altFormat) {
        this.flatpickr.set('altFormat', this.props.options.flatpickrOptions.altFormat)
      }

      if (prevProps.value !== this.props.value) {
        this.flatpickr.setDate(this.props.value, false)
        this.flatpickr.redraw()
      }

      if (prevProps.minDate !== this.props.minDate) {
        this.flatpickr.set('minDate', this.props.minDate)
      }
      if (prevProps.maxDate !== this.props.maxDate) {
        this.flatpickr.set('maxDate', this.props.maxDate)
      }
    }
  }

  componentWillUnmount() {
    this.flatpickr.destroy()
  }

  handleOnChange(selectedDates) {
    const isoStrings = selectedDates.map(date => date.toISOString())
    this.props.onChange(isoStrings)
  }

  hasValue() {
    return this.props.value && this.props.value.length > 0 && this.props.value.every(v => v)
  }

  handleOnBlur() {
    if (this.props.onBlur) {
      const altValue = this.flatpickr.altInput.value
      this.props.onBlur(altValue, this.flatpickr.selectedDates, r => this.flatpickr.setDate(r, true))
    }
  }

  handleToggleClick() {
    if (this.props.events && this.props.events.onFocus) {
      this.props.events.onFocus()
    }
  }

  render() {
    const spanClass = classNames('input-group', 'date-edit', {'hidden': this.props.readOnly})
    const resetClass = classNames('reset', {'hidden': !this.hasValue()})

    return (
      <span>
        <span
          className={spanClass}
          ref={this.wrapper}
          data-wrap
          onBlur={this.handleOnBlur.bind(this)}
        >
          <span className="right-addon">
            <input
              {...(this.props.options ? {placeholder: this.props.options.placeholderText} : {})}
              data-input
            />
            <span className={resetClass} data-clear>×</span>
          </span>
          <span
            data-toggle
            className="input-group-addon"
            onClick={this.handleToggleClick.bind(this)}
          >
            <Icon icon="calendar"/>
          </span>
        </span>
        {this.props.readOnly && <input
          className="form-control"
          disabled
          value={this.flatpickr ? this.flatpickr.altInput.value : ''}
        />}
      </span>
    )
  }
}

DateAbstract.defaultProps = {
  minDate: null,
  maxDate: null
}

DateAbstract.propTypes = {
  intl: intlShape.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.arrayOf(PropTypes.string),
  options: PropTypes.shape({
    placeholderText: PropTypes.string,
    flatpickrOptions: PropTypes.object
  }),
  readOnly: PropTypes.bool,
  initialized: PropTypes.func,
  events: PropTypes.shape({
    onFocus: PropTypes.func
  }),
  minDate: PropTypes.string,
  maxDate: PropTypes.string
}

export default injectIntl(DateAbstract)
