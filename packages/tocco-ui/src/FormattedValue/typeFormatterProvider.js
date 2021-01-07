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
import DescriptionFormatter from './typeFormatters/DescriptionFormatter'
import IntegerFormatter from './typeFormatters/IntegerFormatter'

export default (type, value, options, breakWords = true) => {
  if (map[type]) {
    return React.createElement(map[type], {value, options, breakWords})
  }

  // eslint-disable-next-line no-console
  console.log('No FormattedValue mapper defined for type', type, value)
  return <div/>
}

export const map = {
  'boolean': BooleanFormatter,
  'date': DateFormatter,
  'datetime': DateTimeFormatter,
  'document': DocumentFormatter,
  'document-compact': DocumentCompactFormatter,
  'duration': DurationFormatter,
  'html': HtmlFormatter,
  'integer': IntegerFormatter,
  'moneyamount': MoneyFormatter,
  'multi-remote': MultiSelectFormatter,
  'multi-select': MultiSelectFormatter,
  'number': NumberFormatter,
  'percent': PercentFormatter,
  'phone': PhoneFormatter,
  'remote': SingleSelectFormatter,
  'single-select': SingleSelectFormatter,
  'string': StringFormatter,
  'text': TextFormatter,
  'time': TimeFormatter,
  'url': UrlFormatter,
  'description': DescriptionFormatter
}
