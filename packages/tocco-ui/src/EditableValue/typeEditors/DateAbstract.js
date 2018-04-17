import React from 'react'
import PropTypes from 'prop-types'
import {injectIntl, intlShape} from 'react-intl'
import classNames from 'classnames'

class DateAbstract extends React.Component {
  Flatpickr = null

  constructor(props) {
    super(props)

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

    this.flatpickr = new this.Flatpickr(this.wrapper, this.options)
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

  componentWillReceiveProps(props) {
    const locale = this.getLocale(props.intl.locale)
    this.Flatpickr.localize(locale)
    this.flatpickr.set('locale', locale)

    this.flatpickr.set('altFormat', props.options.flatpickrOptions.altFormat)
    this.flatpickr.setDate(props.value, false)
    this.flatpickr.redraw()
  }

  handleOnChange(selectedDates) {
    const isoStrings = selectedDates.map(date => date.toISOString())
    this.props.onChange(isoStrings)
  }

  refMapper(ref) {
    this.wrapper = ref
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
          ref={this.refMapper.bind(this)}
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
            <i className="fa fa-calendar" aria-hidden="true"></i>
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
  })
}

export default injectIntl(DateAbstract)
