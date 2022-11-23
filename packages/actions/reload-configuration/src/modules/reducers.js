import configurationReducer, {sagas as configurationSagas} from '../modules/configuration'

export default {
  configuration: configurationReducer
}

export const sagas = [configurationSagas]
