import consoleLogger from '../consoleLogger'

const isDefined = value => value !== undefined

export const getDispatchActions = (input, actionSettings, checkMandatory = true) =>
  actionSettings.reduce((acc, actionSetting) => {
    if (isDefined(input[actionSetting.name])) {
      acc.push(actionSetting.action(...actionSetting.argsFactory(input)))
    } else if (actionSetting.mandatory && checkMandatory) {
      consoleLogger.logError(`Mandatory field '${actionSetting.name}' not set in input`)
    }
    return acc
  }, [])
