import React from 'react'

import StringFormatter from './typeFormatters/StringFormatter'
import TextFormatter from './typeFormatters/TextFormatter'
import NumberFormatter from './typeFormatters/NumberFormatter'
import DecimalFormatter from './typeFormatters/DecimalFormatter'
import UrlFormatter from './typeFormatters/UrlFormatter'
import DateFormatter from './typeFormatters/DateFormatter'
import DateTimeFormatter from './typeFormatters/DateTimeFormatter'
import TimeFormatter from './typeFormatters/TimeFormatter'
import DurationFormatter from './typeFormatters/DurationFormatter'
import MoneyFormatter from './typeFormatters/MoneyFormatter'
import BooleanFormatter from './typeFormatters/BooleanFormatter'
import LoginFormatter from './typeFormatters/LoginFormatter'
import LongitudeFormatter from './typeFormatters/LongitudeFormatter'
import PercentFormatter from './typeFormatters/PercentFormatter'
import DocumentFormatter from './typeFormatters/DocumentFormatter'
import HtmlFormatter from './typeFormatters/HtmlFormatter'
import SingleSelectFormatter from './typeFormatters/SingleSelectFormatter'
import MultiSelectFormatter from './typeFormatters/MultiSelectFormatter'
import DocumentCompactFormatter from './typeFormatters/DocumentCompactFormatter'

export default (type, value, options) => {
  if (map[type]) {
    return React.createElement(map[type], {value, options})
  }

  // eslint-disable-next-line no-console
  console.log('No FormattedValue mapper defined for type', type, value)
  return <div/>
}

export const map = {
  'string': StringFormatter,
  'char': StringFormatter,
  'uuid': StringFormatter,
  'identifier': StringFormatter,
  'postcode': StringFormatter,
  'ipaddress': StringFormatter,
  'html': HtmlFormatter,
  'text': TextFormatter,
  'short': NumberFormatter,
  'integer': NumberFormatter,
  'sorting': NumberFormatter,
  'long': NumberFormatter,
  'number': NumberFormatter,
  'version': NumberFormatter,
  'dataamount': NumberFormatter,
  'decimal': DecimalFormatter,
  'percent': PercentFormatter,
  'double': DecimalFormatter,
  'phone': StringFormatter,
  'counter': StringFormatter,
  'url': UrlFormatter,
  'date': DateFormatter,
  'birthdate': DateFormatter,
  'datetime': DateTimeFormatter,
  'time': TimeFormatter,
  'duration': DurationFormatter,
  'email': StringFormatter,
  'moneyamount': MoneyFormatter,
  'boolean': BooleanFormatter,
  'latitude': LongitudeFormatter,
  'longitude': LongitudeFormatter,
  'login': LoginFormatter,
  'document': DocumentFormatter,
  'single-select': SingleSelectFormatter,
  'remote': SingleSelectFormatter,
  'multi-select': MultiSelectFormatter,
  'multi-remote': MultiSelectFormatter,
  'createuser': StringFormatter,
  'createts': DateTimeFormatter,
  'document-compact': DocumentCompactFormatter,
  'binary': DocumentFormatter
}
