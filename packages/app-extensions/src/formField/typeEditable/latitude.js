import _get from 'lodash/get'

export default {
  getOptions: ({modelField}) => ({
    postPointDigits: _get(modelField, 'validation.decimalDigits.postPointDigits', 2),
    prePointDigits: _get(modelField, 'validation.decimalDigits.prePointDigits', 8),
    minValue: _get(modelField, 'validation.numberRange.fromIncluding', -90),
    maxValue: _get(modelField, 'validation.numberRange.toIncluding', 90),
    allowNegative: true
  })
}
