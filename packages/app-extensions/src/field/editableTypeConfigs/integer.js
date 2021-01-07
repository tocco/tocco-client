import _get from 'lodash/get'

export default {
  getOptions: ({formField}) => ({
    minValue: _get(formField, 'validation.numberRange.fromIncluding', null),
    maxValue: _get(formField, 'validation.numberRange.toIncluding', null)
  })
}
