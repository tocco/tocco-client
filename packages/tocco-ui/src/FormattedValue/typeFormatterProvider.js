import React from 'react'

import StringFormatter from './typeFormatters/StringFormatter'
import UrlFormatter from './typeFormatters/UrlFormatter'
import DateFormatter from './typeFormatters/DateFormatter'
import MoneyFormatter from './typeFormatters/MoneyFormatter'
import BooleanFormatter from './typeFormatters/BooleanFormatter'

export default (type, value) => {
  if (map[type]) {
    return React.createElement(map[type], {value})
  }

  console.log('no label defined for type', type, value)
  return <div/>
}

const map = {
  'string': StringFormatter,
  'phone': StringFormatter,
  'counter': StringFormatter,
  'number': StringFormatter,
  'text': StringFormatter,
  'url': UrlFormatter,
  'date': DateFormatter,
  'birthdate': DateFormatter,
  'email': StringFormatter,
  'moneyamount': MoneyFormatter,
  'boolean': BooleanFormatter
}
