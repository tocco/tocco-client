export const RETRIEVE_MODEL = 'MergeMatrix/RETRIEVE_MODEL'

export function retrieveModel(model) {
  return {
    type: RETRIEVE_MODEL,
    model
  }
}
