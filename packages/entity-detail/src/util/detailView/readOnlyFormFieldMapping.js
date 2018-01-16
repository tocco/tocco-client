import {formField} from 'tocco-util'
import SubGrid from './fromFieldFactories/subGrid'

export default {
  'birthdate': formField.formattedValueFactory('birthdate'),
  'boolean': formField.formattedValueFactory('boolean'),
  'code': formField.formattedValueFactory('text'),
  'data-amount': formField.formattedValueFactory('number'),
  'date': formField.formattedValueFactory('date'),
  'datetime': formField.formattedValueFactory('datetime'),
  'display': formField.formattedValueFactory('html'),
  'document': formField.formattedValueFactory('document'),
  'email': formField.formattedValueFactory('email'),
  'html': formField.formattedValueFactory('html'),
  'image': formField.formattedValueFactory('document'),
  'login': formField.formattedValueFactory('string'),
  'money-amount': formField.formattedValueFactory('number'),
  'multi-remote-field': formField.formattedValueFactory('multi-remote'),
  'multi-select-box': formField.formattedValueFactory('multi-select'),
  'named-upload': formField.formattedValueFactory('document'),
  'integer': formField.formattedValueFactory('number'),
  'percent': formField.formattedValueFactory('number'),
  'phone': formField.formattedValueFactory('phone'),
  'pulldown-date': formField.formattedValueFactory('date'),
  'range': {
    'date': formField.formattedValueFactory('date-range'),
    'birthdate': formField.formattedValueFactory('date-range')
  },
  'remote': formField.formattedValueFactory('remote'),
  'single-select-box': formField.formattedValueFactory('single-select'),
  'text-area': formField.formattedValueFactory('text'),
  'text': formField.formattedValueFactory('text'),
  'string': formField.formattedValueFactory('string'),
  'upload': formField.formattedValueFactory('document'),
  'url': formField.formattedValueFactory('url'),
  'uuid': formField.formattedValueFactory('string'),
  'subTable': SubGrid()
}
