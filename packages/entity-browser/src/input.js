import {consoleLogger} from 'tocco-util'

import {setEntityName, setFormBase, setAppId, setScrollBehaviour} from './modules/entityBrowser/actions'

const isDefined = value => value !== undefined

export const getDispatchActions = input =>
  actionSettings.reduce((acc, actionSetting) => {
    if (isDefined(input[actionSetting.name])) {
      acc.push(actionSetting.action(...actionSetting.argsFactory(input)))
    } else if (actionSetting.mandatory) {
      consoleLogger.logError(`EntityBrowser: Mandatory field '${actionSetting.name}' not set in input`)
    }
    return acc
  }, [])

const actionSettings = [
  {
    name: 'entityName',
    action: setEntityName,
    mandatory: true,
    argsFactory: input => [input.entityName]
  },
  {
    name: 'entityName',
    action: setFormBase,
    argsFactory: input => [input.formBase || input.entityName]
  },
  {
    name: 'formBase',
    action: setFormBase,
    argsFactory: input => [input.formBase]
  },
  {
    name: 'scrollBehaviour',
    action: setScrollBehaviour,
    argsFactory: input => [input.scrollBehaviour]
  },
  {
    name: 'id',
    action: setAppId,
    argsFactory: input => [input.id || new Date().valueOf()]
  }
]
