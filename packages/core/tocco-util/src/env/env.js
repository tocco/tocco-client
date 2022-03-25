export const NULL_BUSINESS_UNIT = '__n-u-l-l__'

const env = {
  backendUrl: undefined,
  businessUnit: undefined,
  ruleProvider: undefined
}

export const getBackendUrl = () => {
  return env.backendUrl || __BACKEND_URL__
}

export const setBackendUrl = value => {
  env.backendUrl = value
}

export const getBusinessUnit = () => {
  return env.businessUnit
}

export const setBusinessUnit = value => {
  env.businessUnit = value
}

export const getRuleProvider = () => {
  return env.ruleProvider
}

export const setRuleProvider = value => {
  env.ruleProvider = value
}
