import _get from 'lodash/get'

export default {
  getOptions: ({formField}) => ({
    prePointDigits: _get(formField, 'validation.decimalDigits.prePointDigits', null),
    postPointDigits: _get(formField, 'validation.decimalDigits.postPointDigits', null),
    minValue: _get(formField, 'validation.numberRange.fromIncluding', null),
    maxValue: _get(formField, 'validation.numberRange.toIncluding', null),
    allowNegative: false,
    suffix: '%'
  })
}
