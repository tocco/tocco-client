import React from 'react'

import BooleanFormatter from './typeFormatters/BooleanFormatter'
import DateFormatter from './typeFormatters/DateFormatter'
import DateTimeFormatter from './typeFormatters/DateTimeFormatter'
import DecimalFormatter from './typeFormatters/DecimalFormatter'
import DocumentCompactFormatter from './typeFormatters/DocumentCompactFormatter'
import DocumentFormatter from './typeFormatters/DocumentFormatter'
import DurationFormatter from './typeFormatters/DurationFormatter'
import HtmlFormatter from './typeFormatters/HtmlFormatter'
import LoginFormatter from './typeFormatters/LoginFormatter'
import LongitudeFormatter from './typeFormatters/LongitudeFormatter'
import MoneyFormatter from './typeFormatters/MoneyFormatter'
import NumberFormatter from './typeFormatters/NumberFormatter'
import MultiSelectFormatter from './typeFormatters/MultiSelectFormatter'
import PercentFormatter from './typeFormatters/PercentFormatter'
import PhoneFormatter from './typeFormatters/PhoneFormatter'
import SingleSelectFormatter from './typeFormatters/SingleSelectFormatter'
import StringFormatter from './typeFormatters/StringFormatter'
import TextFormatter from './typeFormatters/TextFormatter'
import TimeFormatter from './typeFormatters/TimeFormatter'
import UrlFormatter from './typeFormatters/UrlFormatter'

export default (type, value, options) => {
  if (map[type]) {
    return React.createElement(map[type], {value, options})
  }

  // eslint-disable-next-line no-console
  console.log('No FormattedValue mapper defined for type', type, value)
  return <div/>
}

export const map = {
  'binary': DocumentFormatter,
  'birthdate': DateFormatter,
  'boolean': BooleanFormatter,
  'char': StringFormatter,
  'counter': StringFormatter,
  'createts': DateTimeFormatter,
  'createuser': StringFormatter,
  'dataamount': NumberFormatter,
  'date': DateFormatter,
  'datetime': DateTimeFormatter,
  'decimal': DecimalFormatter,
  'document': DocumentFormatter,
  'document-compact': DocumentCompactFormatter,
  'double': DecimalFormatter,
  'duration': DurationFormatter,
  'email': StringFormatter,
  'html': HtmlFormatter,
  'identifier': StringFormatter,
  'integer': NumberFormatter,
  'ipaddress': StringFormatter,
  'latitude': LongitudeFormatter,
  'login': LoginFormatter,
  'long': NumberFormatter,
  'longitude': LongitudeFormatter,
  'moneyamount': MoneyFormatter,
  'multi-remote': MultiSelectFormatter,
  'multi-select': MultiSelectFormatter,
  'number': NumberFormatter,
  'percent': PercentFormatter,
  'phone': PhoneFormatter,
  'postcode': StringFormatter,
  'remote': SingleSelectFormatter,
  'short': NumberFormatter,
  'single-select': SingleSelectFormatter,
  'sorting': NumberFormatter,
  'string': StringFormatter,
  'text': TextFormatter,
  'time': TimeFormatter,
  'url': UrlFormatter,
  'uuid': StringFormatter,
  'version': NumberFormatter
}
