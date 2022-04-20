import moment from 'moment'

const datetimeFormat = 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]'
const dateFormat = 'YYYY-MM-DD'

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
      const fromValue = value ? moment(value).utc().format(datetimeFormat) : null
      const toValue = value ? moment(value).utc().add(1, 'd').format(datetimeFormat) : null
      return {from: fromValue, to: toValue, isRangeValue: true}
    },
    fromRange: value => {
      if (value && value.from) {
        return moment.utc(value.from, datetimeFormat).local().format(dateFormat)
      }
      if (value && value.to) {
        return moment.utc(value.to, datetimeFormat).local().format(dateFormat)
      }
      return null
    },
    getToOptions: (options, fromValue) => ({...options, flatpickrOptions: {minDate: fromValue}}),
    getFromOptions: (options, toValue) => ({...options, flatpickrOptions: {maxDate: toValue}})
  },
  date: {
    icons: {
      range: 'calendar-plus',
      single: 'calendar-minus'
    },
    getToOptions: (options, fromValue) => ({...options, flatpickrOptions: {minDate: fromValue}}),
    getFromOptions: (options, toValue) => ({...options, flatpickrOptions: {maxDate: toValue}})
  }
}

export default rangeTypeMappings
