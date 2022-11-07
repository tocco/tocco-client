import {setAdminAllowed, setLoggedIn} from './actions'
import {addToStore} from './login'
import {doRequest, doSessionRequest} from './sagas'

export default {
  addToStore,
  setLoggedIn,
  setAdminAllowed,
  doSessionRequest,
  doRequest
}
