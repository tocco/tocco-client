import _get from 'lodash/get'

export default {
  getValue: ({currentValue}) => _get(currentValue, 'value')
}
