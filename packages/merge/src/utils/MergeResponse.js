export function mergingWithoutProblems(mergeResponse) {
  if (mergeResponse) {
    if (mergeResponse.notCopiedRelations && mergeResponse.notCopiedRelations.length > 0) {
      return false
    }
    if (mergeResponse.notDeletedEntities && mergeResponse.notDeletedEntities.length > 0) {
      return false
    }
  }
  return true
}
