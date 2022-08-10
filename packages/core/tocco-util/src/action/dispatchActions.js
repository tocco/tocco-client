import consoleLogger from '../consoleLogger'

const isDefined = value => value !== undefined

/**
 *
 * {
 *  name: 'id',
 *  action: setId,
 *  argsFactory: input => [input.id],
 *  mandatory: true
 * }
 *
 * @param {object} input
 * @param {object} actionSettings
 * @param {bool} checkMandatory
 * @returns
 */
export const getDispatchActions = (input, actionSettings, checkMandatory = true) =>
  actionSettings.reduce((acc, actionSetting) => {
    if (isDefined(input[actionSetting.name]) && typeof actionSetting.action === 'function') {
      acc.push(actionSetting.action(...actionSetting.argsFactory(input)))
    } else if (actionSetting.mandatory && checkMandatory) {
      consoleLogger.logError(`Mandatory field '${actionSetting.name}' not set in input`)
    }
    return acc
  }, [])
