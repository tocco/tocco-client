export const FETCH_DATA = 'log/FETCH_DATA'
export const SET_DATA = 'log/SET_DATA'
export const FETCH_FILECONTENT = 'log/FETCH_FILECONTENT'
export const SET_FILECONTENT = 'log/SET_FILECONTENT'

export const fetchData = () => ({
  type: FETCH_DATA
})

export const setData = data => ({
  type: SET_DATA,
  payload: {
    data
  }
})

export const fetchFileContent = conditionString => ({
  type: FETCH_FILECONTENT,
  payload: {
    conditionString
  }
})

export const setFileContent = fileContent => ({
  type: SET_FILECONTENT,
  payload: {
    fileContent
  }
})
