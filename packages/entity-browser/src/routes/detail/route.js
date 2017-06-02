import EntityDetailContainer from './containers/EntityDetailContainer'
import sagas from './modules/sagas'
import detail from './modules'
import {reducer as form} from 'redux-form'

export default {
  container: EntityDetailContainer,
  reducers: {
    detail,
    form
  },
  sagas: [sagas]
}
