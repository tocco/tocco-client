export const FETCH_DATA = 'scoreboard/FETCH_DATA'
export const SET_DATA = 'scoreboard/SET_DATA'

export const fetchData = () => ({
  type: FETCH_DATA
})

export const setData = data => ({
  type: SET_DATA,
  payload: {
    data
  }
})
