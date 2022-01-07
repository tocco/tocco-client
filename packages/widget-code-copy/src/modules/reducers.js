import widgetCodeReducer, {sagas as widgetCodeSagas} from './widgetCode'

export default {
  widgetCode: widgetCodeReducer
}

export const sagas = [widgetCodeSagas]
