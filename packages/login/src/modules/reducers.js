import {intlReducer} from 'react-intl-redux'
import {combineReducers} from 'redux'
import passwordUpdateReducers, {sagas as passwordUpdateSagas} from './passwordUpdate/reducers'

export default {
  intl: intlReducer,
  passwordUpdate: combineReducers(passwordUpdateReducers)
}

export const sagas = [
  ...passwordUpdateSagas
]
