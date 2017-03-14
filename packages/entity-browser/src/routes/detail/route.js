import DetailViewContainer from './containers/DetailViewContainer'
import sagas from './modules/sagas'
import detail from './modules'
import {reducer as form} from 'redux-form'

export default {
  container: DetailViewContainer,
  reducers: {
    detail,
    form
  },
  sagas: [sagas]
}
