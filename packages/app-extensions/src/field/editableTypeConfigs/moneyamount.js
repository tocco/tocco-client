import _get from 'lodash/get'

export default {
  getOptions: ({formField}) => ({
    postPointDigits: _get(formField, 'validation.decimalDigits.postPointDigits', 2),
    prePointDigits: _get(formField, 'validation.decimalDigits.prePointDigits', null),
    minValue: _get(formField, 'validation.numberRange.fromIncluding', null),
    maxValue: _get(formField, 'validation.numberRange.toIncluding', null),
    allowNegative: true,
    fixedDecimalScale: true
  })
}
