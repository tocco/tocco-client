export const CHANGE_TARGET_ENTITY = 'MergeMatrix/CHANGE_TARGET_ENTITY'

export const changeTargetEntity = (pk) => ({
  type: CHANGE_TARGET_ENTITY,
  payload: {
    pk
  }
})
