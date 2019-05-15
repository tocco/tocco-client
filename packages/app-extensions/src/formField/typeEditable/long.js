import _get from 'lodash/get'

export default {
  getOptions: ({modelField}) => ({
    postPointDigits: _get(modelField, 'validation.decimalDigits.postPointDigits', null),
    prePointDigits: _get(modelField, 'validation.decimalDigits.prePointDigits', null),
    minValue: _get(modelField, 'validation.numberRange.fromIncluding', -(2 ** 63)),
    maxValue: _get(modelField, 'validation.numberRange.toIncluding', (2 ** 63) - 1),
    allowNegative: true,
    decimalScale: 0
  })
}
