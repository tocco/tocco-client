import _get from 'lodash/get'

export default {
  getValue: ({value}) => value / 100, // FormattedNumber assumes percentage is delivered as decimal
  getOptions: ({formField}) => ({
    postPointDigits: _get(formField, 'validation.decimalDigits.postPointDigits', null)
  })
}
