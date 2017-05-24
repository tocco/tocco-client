import React from 'react'
import Flatpickr from 'flatpickr'
import {injectIntl, intlShape} from 'react-intl'

import '!style-loader!css-loader!flatpickr/dist/themes/light.css'

import {de as DE} from 'flatpickr/dist/l10n/de.js'
import {fr as FR} from 'flatpickr/dist/l10n/fr.js'
import {it as IT} from 'flatpickr/dist/l10n/it.js'

class DateAbstract extends React.Component {
  localeMap = {
    'de-CH': DE,
    'de': DE,
    'fr': FR,
    'it': IT
  }

  componentDidMount() {
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

    this.flatpickr = new Flatpickr(this.wrapper, options)
    this.flatpickr.calendarContainer.classList.add('tocco-ui-theme')
  }

  componentWillReceiveProps(props) {
    let locale = this.localeMap[props.intl.locale]
    if (!locale) {
      locale = Flatpickr.l10ns.en
    }
    Flatpickr.localize(locale)
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
  onChange: React.PropTypes.func,
  value: React.PropTypes.arrayOf(React.PropTypes.string),
  options: React.PropTypes.object,
  readOnly: React.PropTypes.bool
}

export default injectIntl(DateAbstract)
