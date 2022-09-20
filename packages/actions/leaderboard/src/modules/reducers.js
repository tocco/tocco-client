import leaderboardReducer, {sagas as leaderboardSagas} from './leaderboard'

export default {
  leaderboard: leaderboardReducer
}

export const sagas = [leaderboardSagas]
