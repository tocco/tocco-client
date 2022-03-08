import detailViewReducer, {sagas as detailViewSagas} from './detailView'

export default {
  detailView: detailViewReducer
}

export const sagas = [detailViewSagas]
