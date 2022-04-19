import {reducer as form} from 'redux-form'

import addressUpdateReducer, {sagas as addressUpdateSagas, formSagaConfig} from './addressUpdate'

export default {
  addressUpdate: addressUpdateReducer,
  form
}

export const sagas = [addressUpdateSagas]
export {formSagaConfig}
