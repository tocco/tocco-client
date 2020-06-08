import qrCodeReducer, {sagas as qrCodeSagas} from './qrCode'

export default {
  qrCode: qrCodeReducer
}

export const sagas = [
  qrCodeSagas
]
