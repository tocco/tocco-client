import {intlReducer} from 'react-intl-redux'

import mainSagas from './sagas'

export default {
  intl: intlReducer
}

export const sagas = [
  mainSagas
]
