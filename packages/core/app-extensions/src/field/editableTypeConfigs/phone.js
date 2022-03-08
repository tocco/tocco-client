import _get from 'lodash/get'

export default {
  getOptions: ({formField}) => ({
    customPhoneRegex: _get(formField, 'validation.phone.customRegex', null),
    defaultCountry: _get(formField, 'validation.phone.defaultRegion', null)
  })
}
