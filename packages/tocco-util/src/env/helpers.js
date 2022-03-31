import {setBackendUrl, setBusinessUnit, setEmbedType} from './env'

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
}
