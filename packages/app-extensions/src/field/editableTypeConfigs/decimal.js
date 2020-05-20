import _get from 'lodash/get'

export default {
  getOptions: ({modelField}) => ({
    postPointDigits: _get(modelField, 'validation.decimalDigits.postPointDigits', null),
    prePointDigits: _get(modelField, 'validation.decimalDigits.prePointDigits', null),
    minValue: _get(modelField, 'validation.numberRange.fromIncluding', null),
    maxValue: _get(modelField, 'validation.numberRange.toIncluding', null),
    allowNegative: true
  })
}
