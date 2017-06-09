import EntityBrowser from './components/EntityBrowser'

import entityBrowser from './modules'
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
  container: EntityBrowser,
  reducers: {
    entityBrowser
  },
  inputDispatches: inputDispatches
}
