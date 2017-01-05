import * as actions from './actions'
import {singleTransferReducer} from 'tocco-util/reducers'

const ACTION_HANDLERS = {
  [actions.SET_ENTITY_NAME]: singleTransferReducer('entityName'),
  [actions.SET_FORM_BASE]: singleTransferReducer('formBase')
}

const initialState = {
  entityName: '',
  formBase: ''
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

