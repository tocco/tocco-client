import PropTypes from 'prop-types'

import BooleanFormatter from './formatters/BooleanFormatter'
import DateFormatter from './formatters/DateFormatter'
import DateTimeFormatter from './formatters/DateTimeFormatter'
import DescriptionFormatter from './formatters/DescriptionFormatter'
import DocumentCompactFormatter from './formatters/DocumentCompactFormatter'
import DocumentFormatter from './formatters/DocumentFormatter'
import DurationFormatter from './formatters/DurationFormatter'
import HtmlFormatter from './formatters/HtmlFormatter'
import IntegerFormatter from './formatters/IntegerFormatter'
import MultiSelectFormatter from './formatters/MultiSelectFormatter'
import NumberFormatter from './formatters/NumberFormatter'
import PercentFormatter from './formatters/PercentFormatter'
import PhoneFormatter from './formatters/PhoneFormatter'
import SingleSelectFormatter from './formatters/SingleSelectFormatter'
import StringFormatter from './formatters/StringFormatter'
import TextFormatter from './formatters/TextFormatter'
import TimeFormatter from './formatters/TimeFormatter'
import UrlFormatter from './formatters/UrlFormatter'

/**
 * Mapping: componentType (e.g. document) to component
 */
export const map = {
  boolean: BooleanFormatter,
  date: DateFormatter,
  datetime: DateTimeFormatter,
  document: DocumentFormatter,
  'document-compact': DocumentCompactFormatter,
  duration: DurationFormatter,
  html: HtmlFormatter,
  integer: IntegerFormatter,
  'multi-remote': MultiSelectFormatter,
  'multi-select': MultiSelectFormatter,
  number: NumberFormatter,
  percent: PercentFormatter,
  phone: PhoneFormatter,
  remote: SingleSelectFormatter,
  'single-select': SingleSelectFormatter,
  string: StringFormatter,
  text: TextFormatter,
  time: TimeFormatter,
  url: UrlFormatter,
  description: DescriptionFormatter
}

const FormatterProvider = ({componentType, value, options, breakWords = true}) => {
  if (map[componentType]) {
    const Component = map[componentType]

    return <Component value={value} options={options} breakWords={breakWords} />
  }

  // eslint-disable-next-line no-console
  console.log('No FormattedValue mapper defined for component type', componentType, value)
  return <div />
}

FormatterProvider.propTypes = {
  componentType: PropTypes.oneOf(Object.keys(map)).isRequired,
  breakWords: PropTypes.bool,
  options: PropTypes.object,
  value: PropTypes.any
}

export default FormatterProvider
