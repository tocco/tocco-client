import {reducer as form} from 'redux-form'

import entityDetailReducer, {sagas as entityDetailSagas, formSagaConfig} from './entityDetail'

export default {
  entityDetail: entityDetailReducer,
  form
}

export const sagas = [entityDetailSagas]
export {formSagaConfig}
