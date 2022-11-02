import entityDmsReducer, {sagas as entityDmsSagas} from './entityDms'

export default {
  entityDms: entityDmsReducer
}

export const sagas = [entityDmsSagas]
