import {parse, format, addDays} from 'date-fns'

const dateFormat = 'yyyy-MM-dd'

const rangeTypeMappings = {
  number: {
    icons: {
      range: 'square-plus',
      single: 'square-minus'
    }
  },
  integer: {
    icons: {
      range: 'square-plus',
      single: 'square-minus'
    }
  },
  datetime: {
    type: 'date',
    icons: {
      range: 'calendar-plus',
      single: 'calendar-minus'
    },
    toRange: value => {
      const fromValue = value ? parse(value, dateFormat, new Date()).toISOString() : null
      const toValue = value ? addDays(parse(value, dateFormat, new Date()), 1).toISOString() : null
      return {from: fromValue, to: toValue, isRangeValue: true}
    },
    fromRange: value => {
      if (value && value.from) {
        return format(new Date(value.from), dateFormat)
      }
      if (value && value.to) {
        return format(new Date(value.to), dateFormat)
      }
      return null
    },
    getToOptions: (options, fromValue) => ({...options, datePickerOptions: {minDate: fromValue}}),
    getFromOptions: (options, toValue) => ({...options, datePickerOptions: {maxDate: toValue}})
  },
  date: {
    icons: {
      range: 'calendar-plus',
      single: 'calendar-minus'
    },
    getToOptions: (options, fromValue) => ({...options, datePickerOptions: {minDate: fromValue}}),
    getFromOptions: (options, toValue) => ({...options, datePickerOptions: {maxDate: toValue}})
  }
}

export default rangeTypeMappings
