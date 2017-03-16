import EntityBrowserContainer from './containers/EntityBrowserContainer'

import entityBrowser from './modules'
import {reducer as toastr} from 'react-redux-toastr'
import sagas from './modules/sagas'
import {setEntityName, setFormBase} from './modules/actions'

const inputDispatches = [
  {
    field: 'entityName',
    action: setEntityName,
    mandatory: true
  },
  {
    field: 'entityName',
    action: setFormBase
  },
  {
    field: 'formBase',
    action: setFormBase
  }
]

export default {
  container: EntityBrowserContainer,
  reducers: {
    entityBrowser,
    toastr
  },
  sagas: [sagas],
  inputDispatches: inputDispatches
}
