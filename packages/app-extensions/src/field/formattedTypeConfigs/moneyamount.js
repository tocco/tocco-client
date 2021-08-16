
import _get from 'lodash/get'

export default {
  getOptions: ({formField}) => ({
    postPointDigits: _get(formField, 'validation.decimalDigits.postPointDigits', 2)
  })
}
