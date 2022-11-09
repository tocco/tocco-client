import scoreboardReducer, {sagas as scoreboardSagas} from './scoreboard'

export default {
  scoreboard: scoreboardReducer
}

export const sagas = [scoreboardSagas]
