import {setSearchFormCollapsed} from './modules/list/actions'

const isDefined = value => value !== undefined

export const getDispatchActions = input =>
  actionSettings.reduce((acc, actionSetting) => {
    if (isDefined(input[actionSetting.name])) {
      acc.push(actionSetting.action(...actionSetting.argsFactory(input)))
    }
    return acc
  }, [])

const actionSettings = [
  {
    name: 'searchFormCollapsed',
    action: setSearchFormCollapsed,
    argsFactory: input => [input.searchFormCollapsed]
  }
]
