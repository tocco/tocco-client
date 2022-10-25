import {parse, format, isMatch, addDays, startOfDay} from 'date-fns'

const DateOnlyFormat = 'yyyy-MM-dd'

const parseDatetime = value => {
  if (isMatch(value, DateOnlyFormat)) {
    return parse(value, DateOnlyFormat, new Date())
  }

  if (isMatch(value, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")) {
    return startOfDay(new Date(value))
  }

  if (isMatch(value, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")) {
    return startOfDay(new Date(value))
  }

  return null
}

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
      const fromValue = value ? parseDatetime(value).toISOString() : null
      const toValue = value ? addDays(parseDatetime(value), 1).toISOString() : null
      return {from: fromValue, to: toValue, isRangeValue: true}
    },
    fromRange: value => {
      if (value && value.from) {
        return format(new Date(value.from), DateOnlyFormat)
      }
      if (value && value.to) {
        return format(new Date(value.to), DateOnlyFormat)
      }
      return null
    },
    getToOptions: (options, fromValue) => ({
      ...options,
      datePickerOptions: {minDate: fromValue, ...options?.datePickerOptions}
    }),
    getFromOptions: (options, toValue) => ({
      ...options,
      datePickerOptions: {maxDate: toValue, ...options?.datePickerOptions}
    })
  },
  date: {
    icons: {
      range: 'calendar-plus',
      single: 'calendar-minus'
    },
    getToOptions: (options, fromValue) => ({
      ...options,
      datePickerOptions: {minDate: fromValue, ...options?.datePickerOptions}
    }),
    getFromOptions: (options, toValue) => ({
      ...options,
      datePickerOptions: {maxDate: toValue, ...options?.datePickerOptions}
    })
  }
}

export default rangeTypeMappings
