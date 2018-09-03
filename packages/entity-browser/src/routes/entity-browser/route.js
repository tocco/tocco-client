import EntityBrowser from './components/EntityBrowser'
import entityBrowser from './modules'
import {setEntityName, setFormBase, setAppId} from './modules/actions'

const inputDispatches = [
  {
    key: 'entityName',
    actionCreator: setEntityName,
    mandatory: true
  },
  {
    key: 'entityName',
    actionCreator: setFormBase
  },
  {
    key: 'formBase',
    actionCreator: setFormBase
  },
  {
    key: 'id',
    defaultValue: new Date().valueOf(),
    actionCreator: setAppId
  }
]

export default {
  container: EntityBrowser,
  reducers: {
    entityBrowser
  },
  inputDispatches: inputDispatches
}
