import {setLimit} from '../modules/listView/actions'
import {setEntityName, setFormBase} from '../modules/entityBrowser/actions'

export const validateAndGetDispatchActions = (input, logError = console.error || console.log) => {
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
  }
]
