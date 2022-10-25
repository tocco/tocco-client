import userMenuReducer, {sagas as userMenuSagas} from './userMenu'

export default {
  userMenu: userMenuReducer
}

export const sagas = [userMenuSagas]
