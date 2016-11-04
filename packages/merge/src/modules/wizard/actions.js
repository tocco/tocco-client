export const SAVE_MERGE = 'Wizard/SAVE_MERGE'
export const SET_MERGE_RESPONSE = 'Wizard/SET_MERGE_RESPONSE'

export function saveMerge() {
  return {
    type: SAVE_MERGE
  }
}

export function setMergeResponse(mergeResponse) {
  return {
    type: SET_MERGE_RESPONSE,
    payload: {
      mergeResponse
    }
  }
}
