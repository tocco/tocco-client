export const SET_THEMETYPE = 'theme/SET_THEMETYPE'

// TODO: rename to themeType
export const setThemeType = themeType => ({
  type: SET_THEMETYPE,
  payload: {
    themeType
  }
})
