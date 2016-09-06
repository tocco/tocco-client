export const SAVE_MERGE = 'MergeMatrix/SAVE_MERGE'
export const CHANGE_TARGET_ENTITY = 'MergeMatrix/CHANGE_TARGET_ENTITY'

export function saveMerge() {
  return {
    type: SAVE_MERGE
  }
}

export function changeTargetEntity(pk) {
  return {
    type: CHANGE_TARGET_ENTITY,
    pk
  }
}
