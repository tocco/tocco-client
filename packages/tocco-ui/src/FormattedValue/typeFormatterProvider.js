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

export default (type, value) => {
  if (map[type]) {
    return React.createElement(map[type], {value})
  }

  console.error('No FormattedValue mapper defined for type', type, value)
  return <div/>
}

export const map = {
  'string': StringFormatter,
  'char': StringFormatter,
  'uuid': StringFormatter,
  'identifier': StringFormatter,
  'postcode': StringFormatter,
  'ipaddress': StringFormatter,
  'html': StringFormatter,
  'text': TextFormatter,
  'short': NumberFormatter,
  'integer': NumberFormatter,
  'sorting': NumberFormatter,
  'long': NumberFormatter,
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
  'document': DocumentFormatter
}
