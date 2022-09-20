export const FETCH_DATA = 'leaderboard/FETCH_DATA'
export const SET_DATA = 'leaderboard/SET_DATA'

export const fetchData = () => ({
  type: FETCH_DATA
})

export const setData = data => ({
  type: SET_DATA,
  payload: {
    data
  }
})
