export const SET_FORM_TOUCHED = 'detailView/SET_FORM_TOUCHED'
export const LOAD_DETAIL_PARAMS = 'root/LOAD_DETAIL_PARAMS'
export const SET_DETAIL_PARAMS = 'root/SET_DETAIL_PARAMS'
export const CLEAR_DETAIL_PARAMS = 'root/CLEAR_DETAIL_PARAMS'

export const setFormTouched = formTouched => ({
  type: SET_FORM_TOUCHED,
  payload: {
    formTouched
  }
})

export const loadDetailParams = url => ({
  type: LOAD_DETAIL_PARAMS,
  payload: {
    url
  }
})

export const setDetailParams = detailParams => ({
  type: SET_DETAIL_PARAMS,
  payload: {
    detailParams
  }
})

export const clearDetailParams = () => ({
  type: CLEAR_DETAIL_PARAMS
})
