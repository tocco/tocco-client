import _get from 'lodash/get'

export default {
  getOptions: ({modelField}) => ({
    postPointDigits: _get(modelField, 'validation.decimalDigits.postPointDigits', null),
    prePointDigits: _get(modelField, 'validation.decimalDigits.prePointDigits', null),
    minValue: _get(modelField, 'validation.numberRange.fromIncluding', -7.92281625142643E+28),
    maxValue: _get(modelField, 'validation.numberRange.toIncluding', 7.92281625142643E+28),
    decimalScale: 28,
    allowNegative: true
  })
}
