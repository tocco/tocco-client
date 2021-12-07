import {doSessionCheck, setAdminAllowed, setLoggedIn} from './actions'
import {addToStore} from './login'
import {doRequest, doSessionRequest} from './sagas'

export default {
  addToStore,
  setLoggedIn,
  setAdminAllowed,
  doSessionCheck,
  doSessionRequest,
  doRequest
}
