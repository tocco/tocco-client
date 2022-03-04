const isDefined = value => value !== undefined

export const getDispatchActions = (input, actionSettings) =>
  actionSettings.reduce((acc, actionSetting) => {
    if (isDefined(input[actionSetting.name])) {
      acc.push(actionSetting.action(...actionSetting.argsFactory(input)))
    }
    return acc
  }, [])
