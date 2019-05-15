import _get from 'lodash/get'

export default {
  getOptions: ({modelField}) => ({
    postPointDigits: _get(modelField, 'validation.decimalDigits.postPointDigits', null),
    prePointDigits: _get(modelField, 'validation.decimalDigits.prePointDigits', null),
    minValue: _get(modelField, 'validation.numberRange.fromIncluding', -1.79769313486231E+308),
    maxValue: _get(modelField, 'validation.numberRange.toIncluding', 1.79769313486231E+308),
    decimalScale: 80,
    allowNegative: true
  })
}
