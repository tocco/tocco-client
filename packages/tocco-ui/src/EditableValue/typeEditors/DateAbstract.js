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
    this.props.onChange(dateStr)
  }

  refMapper(ref) {
    this.wrapper = ref
  }

  render() {
    return (
      <span className="input-group" data-wrap="true" ref={this.refMapper.bind(this)}>

        <input
          placeholder="Pick date"
          defaultValue={this.props.value}
          className="form-control date-edit"
          data-input
          data-open
        />
        <span className="input-group-addon" data-toggle>
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
  options: React.PropTypes.object
}

export default injectIntl(DateAbstract)
