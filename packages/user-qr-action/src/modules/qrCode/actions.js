export const FETCH_DATA = 'qrCode/FETCH_DATA'
export const SET_DATA = 'qrCode/SET_DATA'

export const fetchData = () => ({
  type: FETCH_DATA
})

export const setData = data => ({
  type: SET_DATA,
  payload: {
    data
  }
})
