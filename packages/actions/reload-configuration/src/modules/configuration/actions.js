export const FETCH_DATA = 'configuration/FETCH_DATA'
export const SET_DATA = 'configuration/SET_DATA'
export const POST_DATA = 'configuration/POST_DATA'
export const IS_LOADING = 'configuration/IS_LOADING'

export const fetchData = () => ({
  type: FETCH_DATA
})

export const postData = data => ({
  type: POST_DATA,
  payload: {
    data
  }
})

export const setData = data => ({
  type: SET_DATA,
  payload: {
    data
  }
})

export const setLoading = isLoading => ({
  type: IS_LOADING,
  payload: {
    isLoading
  }
})
