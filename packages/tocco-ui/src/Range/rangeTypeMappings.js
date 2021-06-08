import moment from 'moment'

const datetimeFormat = 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]'

const rangeTypeMappings = {
  datetime: {
    type: 'date',
    toRange: value => {
      const fromValue = value ? moment(value).utc().format(datetimeFormat) : null
      const toValue = value ? moment(value).utc().add(1, 'd').format(datetimeFormat) : null
      return {from: fromValue, to: toValue, isRangeValue: true}
    },
    getToOptions: (options, fromValue) => ({...options, flatpickrOptions: {minDate: fromValue}}),
    getFromOptions: (options, toValue) => ({...options, flatpickrOptions: {maxDate: toValue}})
  },
  date: {
    getToOptions: (options, fromValue) => ({...options, flatpickrOptions: {minDate: fromValue}}),
    getFromOptions: (options, toValue) => ({...options, flatpickrOptions: {maxDate: toValue}})
  }
}

export default rangeTypeMappings
