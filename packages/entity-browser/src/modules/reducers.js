import {intlReducer} from 'react-intl-redux'
import entityBrowser from './entityBrowser'

import mainSagas from './entityBrowser/sagas'

export default {
  intl: intlReducer,
  entityBrowser
}

export const sagas = [
  mainSagas
]
