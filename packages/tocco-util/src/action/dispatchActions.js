import consoleLogger from '../consoleLogger'

const isDefined = value => value !== undefined

export const getDispatchActions = (input, actionSettings) =>
  actionSettings.reduce((acc, actionSetting) => {
    if (isDefined(input[actionSetting.name])) {
      acc.push(actionSetting.action(...actionSetting.argsFactory(input)))
    } else if (actionSetting.mandatory) {
      consoleLogger.logError(`Mandatory field '${actionSetting.name}' not set in input`)
    }
    return acc
  }, [])
