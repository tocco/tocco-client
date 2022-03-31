import consoleLogger from '../consoleLogger'

export const NULL_BUSINESS_UNIT = '__n-u-l-l__'

export const ALLOWED_EMBED_TYPES = ['admin', 'widget']

const env = {
  backendUrl: undefined,
  businessUnit: undefined,
  embedType: 'admin'
}

export const getBackendUrl = () => env.backendUrl || __BACKEND_URL__

export const setBackendUrl = value => {
  env.backendUrl = value
}

export const getBusinessUnit = () => env.businessUnit

export const setBusinessUnit = value => {
  env.businessUnit = value
}

export const getEmbedType = () => env.embedType

export const setEmbedType = value => {
  if (!ALLOWED_EMBED_TYPES.includes(value)) {
    consoleLogger.logError(
      `'${value}' as embedType is not allowed. Allowed embedTypes are: ${ALLOWED_EMBED_TYPES.join(', ')}`
    )
    return
  }

  env.embedType = value
}
