export const LOAD_MODEL = 'formData/LOAD_MODEL'

export const loadModel = (path, callback) => ({
  type: LOAD_MODEL,
  payload: {
    path,
    callback
  }
})
