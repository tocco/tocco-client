import consoleLogger from '../consoleLogger'

export const NULL_BUSINESS_UNIT = '__n-u-l-l__'

/**
 * admin: Root package is `admin` app.
 *  - Fullscreen entity-list with `scrollBehaviour=inline`
 *  - Apply Tocco-Admin theme
 *  - X-Client header in REST requests is 'client'
 *
 * widget: Root package is a `widget` and runs in an external CMS.
 *  - Inline entity-list with `scrollBehaviour=none`
 *  - Hiding meta information on entity-detail
 *  - Apply Tocco-Default-Widget theme
 *  - X-Client header in REST requests is 'widget'
 *
 * legacy-widget: Root package is a `widget` that runs in the legacy CMS.
 *  - Hiding meta information on entity-detail
 *  - Apply Tocco-Admin theme
 *  - X-Client header in REST requests is 'widget'
 */
export const ALLOWED_EMBED_TYPES = ['admin', 'widget', 'legacy-widget']

const env = {
  backendUrl: undefined,
  businessUnit: undefined,
  embedType: 'admin',
  widgetConfigKey: undefined
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

export const getWidgetConfigKey = () => env.widgetConfigKey

export const setWidgetConfigKey = value => {
  env.widgetConfigKey = value
}
