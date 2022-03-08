export const TOASTER = 'notification/TOASTER'
export const REMOVE_TOASTER = 'notification/REMOVE_TOASTER'
export const REMOVE_TOASTER_FROM_STORE = 'notification/REMOVE_TOASTER_FROM_STORE'

export const toaster = toaster => ({
  type: TOASTER,
  payload: {
    toaster
  }
})

export const removeToaster = (key, manually) => ({
  type: REMOVE_TOASTER,
  payload: {
    key,
    manually
  }
})

export const removeToasterFromStore = key => ({
  type: REMOVE_TOASTER_FROM_STORE,
  payload: {
    key
  }
})
