import {setLimit} from '../routes/list/modules/actions'
import {setEntityName, setFormBase, setShowSearchForm,
        setDisableSimpleSearch, setSimpleSearchFields} from '../routes/entity-browser/modules/actions'
import {setPreselectedSearchFields} from '../routes/list/modules/searchForm/actions'
import {consoleLogger} from 'tocco-util'

export const validateAndGetDispatchActions = (input, logError = consoleLogger.logError) => {
  const dispatches = []
  inputsFields.forEach(f => {
    if (input.hasOwnProperty(f.key)) {
      dispatches.push(f.action(input[f.key]))
    } else if (f.mandatory) {
      logError(`EntityBrowser: Mandatory field '${f.key}' not set in input`)
    }
  })
  return dispatches
}

const inputsFields = [
  {
    key: 'entityName',
    action: setEntityName,
    mandatory: true
  },
  {
    key: 'formBase',
    action: setFormBase,
    mandatory: false
  },
  {
    key: 'limit',
    action: setLimit,
    mandatory: false
  },
  {
    key: 'showSearchForm',
    action: setShowSearchForm,
    mandatory: false
  },
  {
    key: 'disableSimpleSearch',
    action: setDisableSimpleSearch,
    mandatory: false
  },
  {
    key: 'simpleSearchFields',
    action: setSimpleSearchFields,
    mandatory: false
  },
  {
    key: 'preselectedSearchFields',
    action: setPreselectedSearchFields,
    mandatory: false
  }
]
