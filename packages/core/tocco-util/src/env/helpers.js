import {setBackendUrl, setBusinessUnit, setEmbedType, setWidgetConfigKey} from './env'

export const setInputEnvs = input => {
  if (input.backendUrl) {
    setBackendUrl(input.backendUrl)
  }

  if (input.businessUnit) {
    setBusinessUnit(input.businessUnit)
  }

  if (input.appContext?.embedType) {
    setEmbedType(input.appContext?.embedType)
  }

  if (input.appContext?.widgetConfigKey) {
    setWidgetConfigKey(input.appContext?.widgetConfigKey)
  }
}
