export const RETRIEVE_MODEL = 'MergeMatrix/RETRIEVE_MODEL'

export const retrieveModel = model => ({
  type: RETRIEVE_MODEL,
  payload: {
    model
  }
})
