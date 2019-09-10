import React from 'react'

import BooleanFormatter from './typeFormatters/BooleanFormatter'
import DateFormatter from './typeFormatters/DateFormatter'
import DateTimeFormatter from './typeFormatters/DateTimeFormatter'
import NumberFormatter from './typeFormatters/NumberFormatter'
import DocumentCompactFormatter from './typeFormatters/DocumentCompactFormatter'
import DocumentFormatter from './typeFormatters/DocumentFormatter'
import DurationFormatter from './typeFormatters/DurationFormatter'
import HtmlFormatter from './typeFormatters/HtmlFormatter'
import MoneyFormatter from './typeFormatters/MoneyFormatter'
import MultiSelectFormatter from './typeFormatters/MultiSelectFormatter'
import PercentFormatter from './typeFormatters/PercentFormatter'
import PhoneFormatter from './typeFormatters/PhoneFormatter'
import SingleSelectFormatter from './typeFormatters/SingleSelectFormatter'
import StringFormatter from './typeFormatters/StringFormatter'
import TextFormatter from './typeFormatters/TextFormatter'
import TimeFormatter from './typeFormatters/TimeFormatter'
import UrlFormatter from './typeFormatters/UrlFormatter'
import CoordinateFormatter from './typeFormatters/CoordinateFormatter'

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
  'code': TextFormatter,
  'count': StringFormatter,
  'counter': StringFormatter,
  'createts': DateTimeFormatter,
  'createuser': StringFormatter,
  'date': DateFormatter,
  'data-amoun': NumberFormatter,
  'date-range': DateFormatter,
  'datetime': DateTimeFormatter,
  'decimal': NumberFormatter,
  'document': DocumentFormatter,
  'document-compact': DocumentCompactFormatter,
  'double': NumberFormatter,
  'duration': DurationFormatter,
  'email': StringFormatter,
  'html': HtmlFormatter,
  'identifier': StringFormatter,
  'integer': StringFormatter,
  'ipaddress': StringFormatter,
  'latitude': CoordinateFormatter,
  'login': StringFormatter,
  'long': StringFormatter,
  'longitude': CoordinateFormatter,
  'moneyamount': MoneyFormatter,
  'multi-remote': MultiSelectFormatter,
  'multi-select': MultiSelectFormatter,
  'number': NumberFormatter,
  'percent': PercentFormatter,
  'phone': PhoneFormatter,
  'postcode': StringFormatter,
  'remote': SingleSelectFormatter,
  'single-select': SingleSelectFormatter,
  'sorting': NumberFormatter,
  'string': StringFormatter,
  'text': TextFormatter,
  'text-area': TextFormatter,
  'time': TimeFormatter,
  'url': UrlFormatter,
  'uuid': StringFormatter,
  'version': NumberFormatter
}
