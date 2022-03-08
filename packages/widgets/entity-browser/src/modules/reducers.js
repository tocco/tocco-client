import {reducer as form} from 'redux-form'

import detailReducer, {sagas as detailSagas} from './detail'
import entityBrowserReducer, {sagas as entityBrowserSagas} from './entityBrowser'

export default {
  detail: detailReducer,
  form,
  entityBrowser: entityBrowserReducer
}

export const sagas = [entityBrowserSagas, detailSagas]
