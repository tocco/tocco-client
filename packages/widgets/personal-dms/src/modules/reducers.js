import personalDmsReducer, {sagas as personalDmsSagas} from './personalDms'

export default {
  personalDms: personalDmsReducer
}

export const sagas = [personalDmsSagas]
