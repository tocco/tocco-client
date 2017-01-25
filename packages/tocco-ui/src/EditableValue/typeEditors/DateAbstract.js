import React from 'react'
import Flatpickr from 'flatpickr'
import {injectIntl, intlShape} from 'react-intl'

import '!style-loader!css-loader!flatpickr/dist/themes/material_red.css'

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
      ...this.props.options
    }

    const locale = this.localeMap[this.props.intl.locale]
    if (locale) {
      options.locale = locale
    }

    this.flatpickr = new Flatpickr(this.wrapper, options)
  }

  componentWillReceiveProps(props) {
    Flatpickr.localize(this.localeMap[props.intl.locale])
    if (props.intl) {
      this.flatpickr.set('locale', this.localeMap[props.intl.locale])
    }
    if (props.value) {
      this.flatpickr.setDate(props.value)
    }
  }

  handleOnChange(selectedDates, dateStr) {
    console.log('selectedDates', selectedDates, dateStr)
    this.props.onChange(dateStr)
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
          defaultValue={this.props.value}
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
  value: React.PropTypes.string,
  options: React.PropTypes.object,
  readOnly: React.PropTypes.bool
}

export default injectIntl(DateAbstract)
