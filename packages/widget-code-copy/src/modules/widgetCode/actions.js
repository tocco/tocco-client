export const FETCH_WIDGET_CONFIG = 'widgetCode/FETCH_WIDGET_CONFIG'
export const SET_WIDGET_CONFIG = 'widgetCode/SET_WIDGET_CONFIG'
export const COPY_WIDGET_CODE = 'widgetCode/COPY_WIDGET_CODE'

export const fetchWidgetConfig = () => ({
  type: FETCH_WIDGET_CONFIG
})

export const setWidgetConfig = widgetConfig => ({
  type: SET_WIDGET_CONFIG,
  payload: {
    widgetConfig
  }
})

export const copyWidgetCode = () => ({
  type: COPY_WIDGET_CODE
})
