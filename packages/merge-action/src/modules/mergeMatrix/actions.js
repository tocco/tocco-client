export const CHANGE_TARGET_ENTITY = 'MergeMatrix/CHANGE_TARGET_ENTITY'

export function changeTargetEntity(pk) {
  return {
    type: CHANGE_TARGET_ENTITY,
    pk
  }
}
