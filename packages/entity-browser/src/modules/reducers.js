import {reducer as toastr} from 'react-redux-toastr'

import entityBrowser from '../routes/entity-browser/modules'

import entityBrowserSagas from '../routes/entity-browser/modules/sagas'

export default {
  toastr,
  entityBrowser
}

export const sagas = [
  entityBrowserSagas
]
