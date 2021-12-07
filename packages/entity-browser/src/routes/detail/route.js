import {reducer as form} from 'redux-form'

import EntityDetailContainer from './containers/EntityDetailContainer'
import detail from './modules'
import sagas from './modules/sagas'

export default {
  container: EntityDetailContainer,
  reducers: {
    detail,
    form
  },
  sagas: [sagas]
}
