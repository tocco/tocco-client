import {formField} from 'tocco-app-extensions'

import SubGrid from './fromFieldFactories/subGrid'

export default {
  'binary': formField.formattedValueFactory('document'),
  'birthdate': formField.formattedValueFactory('birthdate'),
  'boolean': formField.formattedValueFactory('boolean'),
  'code': formField.formattedValueFactory('text'),
  'counter': formField.formattedValueFactory('string'),
  'data-amount': formField.formattedValueFactory('decimal'),
  'date': formField.formattedValueFactory('date'),
  'datetime': formField.formattedValueFactory('datetime'),
  'time': formField.formattedValueFactory('time'),
  'display': formField.formattedValueFactory('html'),
  'document': formField.formattedValueFactory('document'),
  'email': formField.formattedValueFactory('email'),
  'html': formField.formattedValueFactory('html'),
  'image': formField.formattedValueFactory('document'),
  'login': formField.formattedValueFactory('string'),
  'long': formField.formattedValueFactory('string'),
  'moneyamount': formField.formattedValueFactory('moneyamount'),
  'multi-remote-field': formField.formattedValueFactory('multi-remote'),
  'multi-select-box': formField.formattedValueFactory('multi-select'),
  'named-upload': formField.formattedValueFactory('document'),
  'integer': formField.formattedValueFactory('decimal'),
  'percent': formField.formattedValueFactory('decimal'),
  'phone': formField.formattedValueFactory('phone'),
  'pulldown-date': formField.formattedValueFactory('date'),
  'range': {
    'date': formField.formattedValueFactory('date-range'),
    'birthdate': formField.formattedValueFactory('date-range')
  },
  'remote': formField.formattedValueFactory('remote'),
  'single-select-box': formField.formattedValueFactory('single-select'),
  'single-remote-field': formField.formattedValueFactory('remote'),
  'text-area': formField.formattedValueFactory('text'),
  'text': formField.formattedValueFactory('text'),
  'string': formField.formattedValueFactory('string'),
  'upload': formField.formattedValueFactory('document'),
  'url': formField.formattedValueFactory('url'),
  'uuid': formField.formattedValueFactory('string'),
  'subTable': SubGrid()
}
