import _get from 'lodash/get'

export default {
  getOptions: ({modelField}) => ({
    prePointDigits: _get(modelField, 'validation.decimalDigits.prePointDigits', null),
    postPointDigits: _get(modelField, 'validation.decimalDigits.postPointDigits', null),
    minValue: _get(modelField, 'validation.numberRange.fromIncluding', null),
    maxValue: _get(modelField, 'validation.numberRange.toIncluding', null)
  })
}
