export const TOASTER = 'notification/TOASTER'
export const REMOVE_TOASTER = 'notification/REMOVE_TOASTER'

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
