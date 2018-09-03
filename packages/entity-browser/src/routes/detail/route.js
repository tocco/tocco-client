import {reducer as form} from 'redux-form'

import EntityDetailContainer from './containers/EntityDetailContainer'
import sagas from './modules/sagas'
import detail from './modules'

export default {
  container: EntityDetailContainer,
  reducers: {
    detail,
    form
  },
  sagas: [sagas]
}
