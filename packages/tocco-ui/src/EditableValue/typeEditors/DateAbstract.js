import PropTypes from 'prop-types'
import React from 'react'
import {injectIntl, intlShape} from 'react-intl'

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
      this.Flatpickr = response[0]
      this.localeMap = {
        'de-CH': response[1].de,
        'de': response[1].de,
        'fr': response[2].fr,
        'it': response[3].it
      }

      this.initializeFlatPickr()
    })
  }

  initializeFlatPickr = flatpickr => {
    const options = {
      wrap: true,
      altInput: true,
      onChange: this.handleOnChange.bind(this),
      clickOpens: false,
      defaultDate: this.props.value,
      ...this.props.options
    }

    const locale = this.localeMap[this.props.intl.locale]
    if (locale) {
      options.locale = locale
    }

    this.flatpickr = new this.Flatpickr(this.wrapper, options)
    this.flatpickr.calendarContainer.classList.add('tocco-ui-theme')
  }

  componentWillReceiveProps(props) {
    let locale = this.localeMap[props.intl.locale]
    if (!locale) {
      locale = this.Flatpickr.l10ns.en
    }
    this.Flatpickr.localize(locale)
    this.flatpickr.set('locale', locale)
    if (props.value) {
      this.flatpickr.setDate(props.value)
    }
  }

  handleOnChange(selectedDates) {
    const isoStrings = selectedDates.map(date => date.toISOString())
    this.props.onChange(isoStrings)
  }

  refMapper(ref) {
    this.wrapper = ref
  }

  toggle() {
    if (!this.props.readOnly) {
      this.flatpickr.toggle()
    }
  }

  render() {
    const spanClass = this.props.readOnly ? 'disabled' : ''
    return (
      <span
        className={'input-group date-edit ' + spanClass}
        onClick={this.toggle.bind(this)}
        ref={this.refMapper.bind(this)}
        data-wrap
      >
        <input
          placeholder="Pick date"
          data-input
        />
        <span className="input-group-addon">
          <span className="glyphicon glyphicon-calendar"/>
        </span>
      </span>
    )
  }
}

DateAbstract.propTypes = {
  intl: intlShape.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.arrayOf(PropTypes.string),
  options: PropTypes.object,
  readOnly: PropTypes.bool
}

export default injectIntl(DateAbstract)
